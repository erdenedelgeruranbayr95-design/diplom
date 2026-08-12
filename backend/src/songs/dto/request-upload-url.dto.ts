import {
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidatorConstraint,
  type ValidationArguments,
  type ValidatorConstraintInterface,
} from 'class-validator';

const ALLOWED_AUDIO_MIME = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/aac', 'audio/ogg', 'audio/flac'];

/* Зураг: цомгийн/дууны ковер. SVG ЗОРИУД БАЙХГҮЙ — түүнд script суулгаж болдог тул
   ижил домэйнээс үйлчилвэл XSS болно. Растр форматууд аюулгүй. */
const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export const UPLOAD_KINDS = ['song', 'cover'] as const;
export type UploadKind = (typeof UPLOAD_KINDS)[number];

/** `kind`-ээс хамаарсан MIME шалгалт.
 *
 *  ⚠️ Хоёр `@ValidateIf`-ээр хийж БОЛОХГҮЙ: class-validator талбар тус бүрд НЭГ
 *  нөхцөл хадгалдаг тул хоёр дахь нь эхнийхийг дардаг (эсвэл хоорондоо зөрчилдөж
 *  шалгалт огт ажиллахгүй болно). Тиймээс нэг constraint дотор салгав. */
@ValidatorConstraint({ name: 'uploadMime' })
class UploadMimeConstraint implements ValidatorConstraintInterface {
  private allowedFor(object: object): string[] {
    return (object as RequestUploadUrlDto).kind === 'cover' ? ALLOWED_IMAGE_MIME : ALLOWED_AUDIO_MIME;
  }

  validate(value: unknown, args: ValidationArguments): boolean {
    return typeof value === 'string' && this.allowedFor(args.object).includes(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return (args.object as RequestUploadUrlDto).kind === 'cover'
      ? 'Зураг нь JPEG, PNG, WebP эсвэл AVIF байх ёстой'
      : 'Дуу нь MP3, WAV, AAC, OGG эсвэл FLAC байх ёстой';
  }
}

export class RequestUploadUrlDto {
  @IsString()
  @MinLength(1)
  filename: string;

  /** Юу байршуулж байгаа — S3 key-ийн угтвар ба зөвшөөрөгдөх MIME-г ЭНЭ шийднэ.
   *  Өгөөгүй бол `song` (хуучин клиентүүд зөвхөн аудио илгээдэг байсан). */
  @IsOptional()
  @IsIn(UPLOAD_KINDS)
  kind?: UploadKind;

  @Validate(UploadMimeConstraint)
  contentType: string;
}
