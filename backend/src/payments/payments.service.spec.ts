import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prisma: {
    user: { findUnique: jest.Mock; update: jest.Mock };
    payment: { findFirst: jest.Mock; create: jest.Mock };
    subscription: { upsert: jest.Mock };
    $transaction: jest.Mock;
  };

  const baseDto = { userId: 'user-1', provider: 'qpay' as const, providerRef: 'ref-1', status: 'SUCCESS' as const };

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn(), update: jest.fn() },
      payment: { findFirst: jest.fn(), create: jest.fn() },
      subscription: { upsert: jest.fn() },
      $transaction: jest.fn((ops) => Promise.all(ops)),
    };
    service = new PaymentsService(prisma as unknown as PrismaService);
  });

  it('throws NotFoundException for an unknown userId', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.handleWebhook(baseDto)).rejects.toThrow(NotFoundException);
  });

  it('skips processing (idempotent) when the same providerRef was already recorded', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
    prisma.payment.findFirst.mockResolvedValue({ id: 'payment-1' });
    const result = await service.handleWebhook(baseDto);
    expect(result).toEqual({ ok: true, duplicate: true });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('records a FAILED payment without activating a subscription', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
    prisma.payment.findFirst.mockResolvedValue(null);
    const result = await service.handleWebhook({ ...baseDto, status: 'FAILED' });
    expect(result).toEqual({ ok: true, duplicate: false });
    expect(prisma.payment.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'FAILED', userId: 'user-1' }) }),
    );
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('activates the subscription and updates the user cache fields on SUCCESS', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
    prisma.payment.findFirst.mockResolvedValue(null);
    const result = await service.handleWebhook(baseDto);
    expect(result).toEqual({ ok: true, duplicate: false });
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(prisma.subscription.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 'user-1' },
        create: expect.objectContaining({ provider: 'qpay', providerRef: 'ref-1', status: 'ACTIVE' }),
      }),
    );
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'user-1' }, data: expect.objectContaining({ subActive: true }) }),
    );
  });

  it('treats a concurrent duplicate (DB unique-constraint P2002 during the race window) as a normal duplicate, not a 500', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
    prisma.payment.findFirst.mockResolvedValue(null); // TOCTOU: passed the check...
    const p2002 = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '5.22.0',
    });
    prisma.$transaction.mockRejectedValueOnce(p2002); // ...but another request won the DB write first.

    const result = await service.handleWebhook(baseDto);
    expect(result).toEqual({ ok: true, duplicate: true });
  });

  it('re-throws non-P2002 errors from the transaction unchanged', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
    prisma.payment.findFirst.mockResolvedValue(null);
    const otherError = new Error('connection lost');
    prisma.$transaction.mockRejectedValueOnce(otherError);

    await expect(service.handleWebhook(baseDto)).rejects.toThrow('connection lost');
  });
});
