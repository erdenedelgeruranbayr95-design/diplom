import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

/* MinIO-той (S3-compatible) харилцах цорын ганц газар — эндээс бусад бүх модуль
   файл хадгалалттай харьцана. Локал диск (multer)-ийг орлож, presigned URL-аар
   клиент шууд MinIO руу upload/download хийдэг болгоно (backend дундуур дамжихгүй).

   Бүх S3_* хувьсагчийг ConfigService-ээр (аппликейшны бусад хэсэгтэй нийцтэй,
   ижил загвар) уншина. Хөгжүүлэлтийн MinIO-ийн зөвшөөрлийг ЗӨВХӨН dev/CI орчинд
   (NODE_ENV !== 'production') fallback болгоно — production-д S3_ACCESS_KEY/
   S3_SECRET_KEY тохируулаагүй бол ил тод алдаа шидэж зогсооно (жинхэнэ нууц
   орлуулагдахгүй нэвтрэхээс сэргийлнэ, см. docs/PRODUCTION-DEPLOYMENT-PLAN.md). */
@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private config: ConfigService) {
    const isProd = this.config.get<string>('NODE_ENV') === 'production';
    const accessKey = this.config.get<string>('S3_ACCESS_KEY');
    const secretKey = this.config.get<string>('S3_SECRET_KEY');

    if (isProd && (!accessKey || !secretKey)) {
      throw new Error('S3_ACCESS_KEY/S3_SECRET_KEY production орчинд заавал тохируулагдсан байх ёстой');
    }

    this.bucket = this.config.get<string>('S3_BUCKET') || 'medreh-media';
    this.publicUrl = (this.config.get<string>('S3_PUBLIC_URL') || 'http://localhost:9000/medreh-media').replace(/\/$/, '');
    this.client = new S3Client({
      endpoint: this.config.get<string>('S3_ENDPOINT') || 'http://localhost:9000',
      region: this.config.get<string>('S3_REGION') || 'us-east-1',
      credentials: {
        accessKeyId: accessKey || 'medreh_minio',
        secretAccessKey: secretKey || 'medreh_minio_pw',
      },
      forcePathStyle: true, // MinIO-д шаардлагатай (virtual-hosted style биш)
    });
  }

  /** Шинэ объектын түлхүүр — коллизи гарахгүй, өргөтгөл хадгална. */
  buildKey(prefix: 'songs' | 'covers' | 'scores', originalName: string): string {
    const ext = originalName.includes('.') ? originalName.slice(originalName.lastIndexOf('.')) : '';
    return `${prefix}/${randomUUID()}${ext}`;
  }

  /** Клиент энэ URL руу шууд `PUT` хийж файлаа МinIO-д байршуулна (backend-ээр дамжихгүй). */
  async getPresignedUploadUrl(key: string, contentType: string, expiresInSec = 900): Promise<string> {
    const cmd = new PutObjectCommand({ Bucket: this.bucket, Key: key, ContentType: contentType });
    return getSignedUrl(this.client, cmd, { expiresIn: expiresInSec });
  }

  /** Хувийн (public бус) объектод зориулсан түр GET URL. Bucket public-read тул
   *  тоглуулалтад ихэвчлэн шаардлагагүй, гэхдээ хаалттай контентод хэрэгтэй. */
  async getPresignedDownloadUrl(key: string, expiresInSec = 3600): Promise<string> {
    const cmd = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, cmd, { expiresIn: expiresInSec });
  }

  /** Bucket-ийг public-read болгосон тул тоглуулах шууд URL — MinIO console-оор
   *  `mc anonymous set download` хийсэн (см. docker-compose тохиргооны тэмдэглэл). */
  publicUrlFor(key: string): string {
    return `${this.publicUrl}/${key}`;
  }

  /** `/uploads/xxx.mp3` эсвэл бүтэн public URL-аас S3 key-г гаргаж авна. */
  keyFromUrl(url: string): string | null {
    if (url.startsWith(`${this.publicUrl}/`)) return url.slice(this.publicUrl.length + 1);
    return null;
  }

  async exists(key: string): Promise<boolean> {
    try {
      await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }

  async putObject(key: string, body: Buffer, contentType: string): Promise<void> {
    await this.client.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: body, ContentType: contentType }));
  }

  /** Аудио дүн шинжилгээ хийхэд файлыг байтаар татаж авна (worker HTTP-ээр татдаг тул
   *  энэ нь зөвхөн backend дотоод хэрэгцээнд — жиш. хэш тооцоолол). */
  async getObjectBytes(key: string): Promise<Buffer> {
    const res = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
    const chunks: Buffer[] = [];
    for await (const chunk of res.Body as AsyncIterable<Buffer>) chunks.push(Buffer.from(chunk));
    return Buffer.concat(chunks);
  }

  /** Устсан Song-той холбоотой бус, bucket дотор үлдсэн бүх объектын key-г буцаана
   *  (RootStorage хэмжилт + өнчин файл цэвэрлэх job-д ашиглана). */
  async listAllKeys(prefix?: string): Promise<{ key: string; size: number }[]> {
    const out: { key: string; size: number }[] = [];
    let ContinuationToken: string | undefined;
    do {
      const res = await this.client.send(
        new ListObjectsV2Command({ Bucket: this.bucket, Prefix: prefix, ContinuationToken }),
      );
      for (const obj of res.Contents ?? []) {
        if (obj.Key) out.push({ key: obj.Key, size: obj.Size ?? 0 });
      }
      ContinuationToken = res.IsTruncated ? res.NextContinuationToken : undefined;
    } while (ContinuationToken);
    return out;
  }
}
