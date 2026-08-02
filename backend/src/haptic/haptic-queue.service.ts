import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';

/* Python worker-тэй харилцах Redis дараалал.

   BullMQ бол Node.js-specific сериализацитай тул Python worker үүнийг шууд уншиж
   чадахгүй — тиймээс энд ЖИРИЙН Redis LIST ашиглана (`LPUSH`/`BRPOP`), job нь
   хялбар JSON. Энэ бол roadmap-ийн "Redis дараалал" шаардлагыг Node/Python хоёр
   талын хэлний зөрчилгүйгээр хангах хамгийн энгийн, найдвартай хувилбар.

   Dead-letter: worker job-ыг DONE_QUEUE эсвэл FAILED_QUEUE руу буцаадаг тул retry/
   алдааны дэлгэрэнгүйг харах боломжтой (`worker/worker/main.py`-г үзнэ үү). */
const JOB_QUEUE = 'haptic:jobs';
const RESULT_QUEUE_PREFIX = 'haptic:result:';

export interface HapticJob {
  jobId: string;
  songId: string;
  fileUrl: string;
  fileHash: string;
  /** Заавал биш — worker байвал ковер зургийг WebP олон хэмжээгээр боловсруулна. */
  coverUrl?: string;
}

export interface HapticJobResult {
  jobId: string;
  songId: string;
  status: 'READY' | 'FAILED';
  scoreUrl?: string;
  bpm?: number;
  musicalKey?: string;
  error?: string;
}

@Injectable()
export class HapticQueueService implements OnModuleDestroy {
  private readonly logger = new Logger(HapticQueueService.name);
  private redis: Redis;

  constructor(private config: ConfigService) {
    this.redis = new Redis(this.config.get<string>('REDIS_URL') || 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });
    this.redis.on('error', (err) => this.logger.warn(`Redis холболтын алдаа: ${err.message}`));
  }

  async enqueue(job: Omit<HapticJob, 'jobId'>): Promise<string> {
    const jobId = randomUUID();
    await this.redis.connect().catch(() => {});
    await this.redis.lpush(JOB_QUEUE, JSON.stringify({ jobId, ...job }));
    return jobId;
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }
}
