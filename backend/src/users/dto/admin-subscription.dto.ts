import { IsBoolean, IsOptional, IsString } from 'class-validator';

/* Админ өөр хэрэглэгчийн PRO эрхийг олгох/хасах. Урьд нь энэ нь frontend-ийн
   localStorage override байсан тул зөвхөн тухайн админы browser-т нөлөөлдөг байв. */
export class AdminSubscriptionDto {
  @IsBoolean()
  active!: boolean;

  @IsOptional()
  @IsString()
  plan?: string;
}
