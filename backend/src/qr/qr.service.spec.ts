import { NotFoundException } from '@nestjs/common';
import { QRStatus } from '@prisma/client';
import { QrService } from './qr.service';
import { PrismaService } from '../prisma/prisma.service';

describe('QrService', () => {
  let service: QrService;
  let prisma: { qRSession: { create: jest.Mock; findUnique: jest.Mock; update: jest.Mock } };

  beforeEach(() => {
    prisma = { qRSession: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() } };
    service = new QrService(prisma as unknown as PrismaService);
  });

  describe('create', () => {
    it('creates a PENDING session with a future expiry', () => {
      prisma.qRSession.create.mockResolvedValue({});
      service.create('u1');
      const call = prisma.qRSession.create.mock.calls[0][0];
      expect(call.data.userId).toBe('u1');
      expect(call.data.token).toEqual(expect.any(String));
      expect(call.data.expiresAt.getTime()).toBeGreaterThan(Date.now());
    });
  });

  describe('get', () => {
    it('404s for an unknown token', async () => {
      prisma.qRSession.findUnique.mockResolvedValue(null);
      await expect(service.get('ghost')).rejects.toThrow(NotFoundException);
    });

    it('lazily transitions an expired PENDING session to EXPIRED', async () => {
      prisma.qRSession.findUnique.mockResolvedValue({
        token: 't1',
        status: QRStatus.PENDING,
        expiresAt: new Date(Date.now() - 1000),
      });
      prisma.qRSession.update.mockResolvedValue({ token: 't1', status: QRStatus.EXPIRED });
      const result = await service.get('t1');
      expect(result.status).toBe(QRStatus.EXPIRED);
      expect(prisma.qRSession.update).toHaveBeenCalledWith({ where: { token: 't1' }, data: { status: QRStatus.EXPIRED } });
    });

    it('returns a still-valid PENDING session unchanged', async () => {
      const session = { token: 't1', status: QRStatus.PENDING, expiresAt: new Date(Date.now() + 60_000) };
      prisma.qRSession.findUnique.mockResolvedValue(session);
      await expect(service.get('t1')).resolves.toBe(session);
      expect(prisma.qRSession.update).not.toHaveBeenCalled();
    });
  });

  describe('connect', () => {
    it('rejects connecting to a non-PENDING (e.g. already CONNECTED) session', async () => {
      prisma.qRSession.findUnique.mockResolvedValue({
        token: 't1',
        status: QRStatus.CONNECTED,
        expiresAt: new Date(Date.now() + 60_000),
      });
      await expect(service.connect('t1')).rejects.toThrow(NotFoundException);
    });

    it('connects a valid PENDING session', async () => {
      prisma.qRSession.findUnique.mockResolvedValue({
        token: 't1',
        status: QRStatus.PENDING,
        expiresAt: new Date(Date.now() + 60_000),
      });
      prisma.qRSession.update.mockResolvedValue({ token: 't1', status: QRStatus.CONNECTED });
      await expect(service.connect('t1')).resolves.toEqual({ token: 't1', status: QRStatus.CONNECTED });
    });
  });
});
