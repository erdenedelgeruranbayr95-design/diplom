import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCheckoutDto {
  /* Төлбөр дууссаны дараа буцах хаяг. Вэб нь өөрийн origin, гар утас нь
     `medreh://` deep link илгээнэ. Зөвшөөрөгдсөн эсэхийг `return-url.ts` шалгана
     — клиентээс ирсэн хаягийг ШУУД ашиглах нь open-redirect эмзэг байдал. */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  returnUrl?: string;
}
