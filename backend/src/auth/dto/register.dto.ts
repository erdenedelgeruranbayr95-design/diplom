import { IsEmail, IsIn, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';

/* Бүртгэлээр сонгож болох ЦОРЫН ГАНЦ дүрүүд.

   ⚠️ АЮУЛГҮЙ БАЙДЛЫН ЦЭГ. Энэ жагсаалтыг `Role` enum-аас автоматаар гаргаж
   БОЛОХГҮЙ — тэгвэл шинэ дүр нэмэх бүрд өөрөө нээгдэнэ. Мөн клиентээс ирсэн
   утгыг шууд ашиглавал хэн ч `{"role":"ADMIN"}` явуулж админ болно.
   Тиймээс энд ГАРААР бичсэн, хаалттай жагсаалт. */
export const SELF_REGISTER_ROLES = ['USER', 'ARTIST'] as const;
export type SelfRegisterRole = (typeof SELF_REGISTER_ROLES)[number];

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  /** Хоосон бол `USER` — хуучин клиентүүд (гар утасны апп) энэ талбарыг
   *  мэдэхгүй тул заавал биш байх ёстой. */
  @IsOptional()
  @IsIn(SELF_REGISTER_ROLES, { message: 'Зөвхөн сонсогч эсвэл уран бүтээлчээр бүртгүүлж болно' })
  role?: SelfRegisterRole;

  /** Уран бүтээлчээр бүртгүүлэх үед — профайлын нэр, ЗААВАЛ.
   *
   *  `@IsOptional()` БИШ, `@ValidateIf` ашигласан нь санаатай: дутуу талбар нь
   *  валидацийн алдаа (400) болох ёстой, 409 Conflict биш — 409 нь «нөөц
   *  давхцав» гэсэн утгатай тул клиент буруу тайлбарлана. */
  @ValidateIf((o: RegisterDto) => o.role === 'ARTIST')
  @IsString()
  @MinLength(2, { message: 'Уран бүтээлчийн нэр дор хаяж 2 тэмдэгт байна' })
  artistName?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  password2: string;
}
