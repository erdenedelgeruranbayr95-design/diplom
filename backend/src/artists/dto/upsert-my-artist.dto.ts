import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/* Хэрэглэгч ӨӨРИЙН уран бүтээлчийн профайлыг үүсгэх/засах.

   ⚠️ `CreateArtistDto`-оос ялгаатай: тэр нь админд зориулсан бөгөөд дурын
   дуучныг үүсгэдэг. Энэ нь зөвхөн дуудагчийн өөрийн профайл — `ownerId`-г
   клиент тал заахгүй, сервер session-ээс авна. */
export class UpsertMyArtistDto {
  @IsString()
  @MinLength(2, { message: 'Нэр дор хаяж 2 тэмдэгт байх ёстой' })
  @MaxLength(60, { message: 'Нэр 60 тэмдэгтээс урт байж болохгүй' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  careerInfo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  photoUrl?: string;

  /* Presigned upload-аар байршуулсан ХӨРӨГ зургийн key (`kind: 'cover'`).
     Уран бүтээлч холбоос бичихгүй, өөрийн зургаа шууд сонгодог тул энэ нь
     үндсэн зам. Өгөгдвөл `photoUrl`-ийг ДАРНА — нийтийн URL-ыг backend угсарна. */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  photoKey?: string;
}
