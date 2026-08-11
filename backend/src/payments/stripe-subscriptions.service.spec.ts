import { Prisma } from '@prisma/client';
import type Stripe from 'stripe';
import type { ConfigService } from '@nestjs/config';

import { StripeSubscriptionsService } from './stripe-subscriptions.service';
import type { PrismaService } from '../prisma/prisma.service';
import type { StripeService } from './stripe.service';

/* Webhook нь ЖИНХЭНЭ мөнгөтэй холбоотой цорын ганц зам тул зан төлөв нь тодорхой
   тогтоогдсон байх ёстой:
     · `invoice.paid` → PRO эрх (сунгалт ч мөн адил)
     · `invoice.payment_failed` → эрхийг УНТРААХГҮЙ (Stripe дахин оролдоно)
     · `customer.subscription.deleted` → эрх унтарна
     · давхардсан webhook → чимээгүй алгасна (Stripe дахин илгээдэг) */

const USER_ID = 'user-1';
const CUSTOMER = 'cus_123';

function p2002() {
  return new Prisma.PrismaClientKnownRequestError('duplicate', {
    code: 'P2002',
    clientVersion: '5.22.0',
  });
}

describe('StripeSubscriptionsService', () => {
  let prisma: {
    user: { findUnique: jest.Mock; update: jest.Mock };
    payment: { create: jest.Mock };
    subscription: { upsert: jest.Mock; updateMany: jest.Mock; findUnique: jest.Mock };
    $transaction: jest.Mock;
  };
  let stripeApi: {
    subscriptions: { retrieve: jest.Mock; update: jest.Mock };
  };
  let stripe: { stripe: unknown; configured: boolean; priceId: string };
  let service: StripeSubscriptionsService;

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn(), update: jest.fn() },
      payment: { create: jest.fn() },
      subscription: { upsert: jest.fn(), updateMany: jest.fn(), findUnique: jest.fn() },
      $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
    };
    stripeApi = {
      subscriptions: {
        retrieve: jest.fn().mockResolvedValue({ current_period_end: 1800000000 }),
        update: jest.fn().mockResolvedValue({}),
      },
    };
    stripe = { stripe: stripeApi, configured: true, priceId: 'price_1' };

    const config = { get: () => undefined } as unknown as ConfigService;
    service = new StripeSubscriptionsService(
      prisma as unknown as PrismaService,
      stripe as unknown as StripeService,
      config,
    );
  });

  /** `invoice.paid` event-ийн жижиг загвар. */
  function paidEvent(invoiceId = 'in_1'): Stripe.Event {
    return {
      type: 'invoice.paid',
      data: {
        object: {
          id: invoiceId,
          customer: CUSTOMER,
          currency: 'mnt',
          amount_paid: 990000,
          metadata: {},
          subscription: 'sub_1',
        },
      },
    } as unknown as Stripe.Event;
  }

  describe('invoice.paid', () => {
    beforeEach(() => {
      /* `resolveUserId` (stripeCustomerId-аар) ба `subSince` хоёулаа энэ дуудлагыг
         ашигладаг тул нэг mock хангалттай. */
      prisma.user.findUnique.mockResolvedValue({ id: USER_ID, subSince: null });
    });

    it('PRO эрхийг идэвхжүүлж, төлбөрийг бичнэ', async () => {
      const result = await service.handleEvent(paidEvent());

      expect(result).toEqual({ handled: true });
      expect(prisma.payment.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ userId: USER_ID, providerRef: 'in_1', status: 'SUCCESS', currency: 'MNT' }),
        }),
      );
      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ subActive: true }) }),
      );
    });

    it('renewsAt-ыг +1 сар гэж таамаглахгүй, Stripe-ийн мөчлөгөөс уншина', async () => {
      await service.handleEvent(paidEvent());

      expect(stripeApi.subscriptions.retrieve).toHaveBeenCalledWith('sub_1');
      const call = prisma.subscription.upsert.mock.calls[0][0];
      expect(call.update.renewsAt).toEqual(new Date(1800000000 * 1000));
    });

    it('давхардсан webhook-ийг чимээгүй алгасна (Stripe дахин илгээдэг)', async () => {
      prisma.$transaction.mockRejectedValue(p2002());

      /* Алдаа ШИДЭХГҮЙ байх нь чухал: 5xx буцаавал Stripe дахин дахин илгээж,
         webhook нь "амжилтгүй" гэж тэмдэглэгдэнэ. */
      await expect(service.handleEvent(paidEvent())).resolves.toEqual({ handled: true });
    });

    it('сунгалт дээр subSince-ийг ХЭВЭЭР үлдээнэ', async () => {
      const original = new Date('2026-01-15T00:00:00Z');
      prisma.user.findUnique.mockResolvedValue({ id: USER_ID, subSince: original });

      await service.handleEvent(paidEvent('in_2'));

      expect(prisma.user.update.mock.calls[0][0].data.subSince).toEqual(original);
    });

    it('хэрэглэгч олдохгүй бол чимээгүй өнгөрнө (мөр бичихгүй)', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.handleEvent(paidEvent())).resolves.toEqual({ handled: true });
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });
  });

  describe('invoice.payment_failed', () => {
    it('PRO эрхийг УНТРААХГҮЙ — Stripe дахин оролдоно', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: USER_ID, subSince: null });

      await service.handleEvent({
        type: 'invoice.payment_failed',
        data: { object: { id: 'in_f', customer: CUSTOMER, currency: 'mnt', amount_due: 990000, metadata: {} } },
      } as unknown as Stripe.Event);

      expect(prisma.payment.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: 'FAILED' }) }),
      );
      /* Гол баталгаа: эрх хэвээр. */
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });

  describe('customer.subscription.deleted', () => {
    it('эрхийг унтрааж, захиалгыг CANCELED болгоно', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: USER_ID, subSince: null });

      await service.handleEvent({
        type: 'customer.subscription.deleted',
        data: { object: { id: 'sub_1', customer: CUSTOMER, metadata: {} } },
      } as unknown as Stripe.Event);

      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: USER_ID }, data: { subActive: false } });
      expect(prisma.subscription.updateMany).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        data: { status: 'CANCELED' },
      });
    });
  });

  it('таниагүй event-д алдаа шидэхгүй, зүгээр л алгасна', async () => {
    const result = await service.handleEvent({
      type: 'payment_intent.created',
      data: { object: {} },
    } as unknown as Stripe.Event);

    expect(result).toEqual({ handled: false });
  });

  describe('cancelAtStripe', () => {
    it('мөчлөгийн эцэст цуцлахаар тэмдэглэнэ (шууд таслахгүй)', async () => {
      prisma.subscription.findUnique.mockResolvedValue({ provider: 'stripe', providerRef: 'sub_1' });

      await expect(service.cancelAtStripe(USER_ID)).resolves.toBe(true);
      expect(stripeApi.subscriptions.update).toHaveBeenCalledWith('sub_1', { cancel_at_period_end: true });
    });

    it('Stripe-ийн бус захиалгыг хөндөхгүй', async () => {
      prisma.subscription.findUnique.mockResolvedValue({ provider: 'admin-grant', providerRef: null });

      await expect(service.cancelAtStripe(USER_ID)).resolves.toBe(false);
      expect(stripeApi.subscriptions.update).not.toHaveBeenCalled();
    });

    it('Stripe унавал алдаа шидэхгүй — DB талын цуцлалт үргэлжлэх ёстой', async () => {
      prisma.subscription.findUnique.mockResolvedValue({ provider: 'stripe', providerRef: 'sub_gone' });
      stripeApi.subscriptions.update.mockRejectedValue(new Error('No such subscription'));

      await expect(service.cancelAtStripe(USER_ID)).resolves.toBe(false);
    });
  });
});
