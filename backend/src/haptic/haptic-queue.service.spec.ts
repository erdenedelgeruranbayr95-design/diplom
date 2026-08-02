import { ConfigService } from '@nestjs/config';
import { HapticQueueService } from './haptic-queue.service';

describe('HapticQueueService', () => {
  let service: HapticQueueService;
  let config: ConfigService;

  beforeEach(() => {
    config = { get: jest.fn().mockReturnValue('redis://localhost:6379') } as unknown as ConfigService;
    service = new HapticQueueService(config);
    // lazyConnect:true тул constructor нь бодит сүлжээний холболт хийхгүй, зөвхөн
    // instance үүсгэдэг тул redis.connect()/lpush()-ыг доор mock хийж бодит сокет
    // нээхгүй unit тест хийнэ.
    (service as unknown as { redis: { connect: jest.Mock; lpush: jest.Mock; disconnect: jest.Mock } }).redis = {
      connect: jest.fn().mockResolvedValue(undefined),
      lpush: jest.fn().mockResolvedValue(1),
      disconnect: jest.fn(),
    };
  });

  it('enqueue() generates a jobId and pushes a JSON-serialized job to the Redis list', async () => {
    const jobId = await service.enqueue({ songId: 's1', fileUrl: 'https://cdn/x.mp3', fileHash: 'abc123' });
    expect(jobId).toEqual(expect.any(String));

    const redis = (service as unknown as { redis: { lpush: jest.Mock } }).redis;
    expect(redis.lpush).toHaveBeenCalledWith('haptic:jobs', expect.stringContaining('"songId":"s1"'));
    const [, payload] = redis.lpush.mock.calls[0];
    expect(JSON.parse(payload)).toEqual(expect.objectContaining({ jobId, songId: 's1', fileHash: 'abc123' }));
  });

  it('onModuleDestroy() disconnects the redis client', () => {
    service.onModuleDestroy();
    const redis = (service as unknown as { redis: { disconnect: jest.Mock } }).redis;
    expect(redis.disconnect).toHaveBeenCalled();
  });
});
