import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

/* Эмнэлгийн шинж чанартай эмзэг талбар (User.hearingProfile) DB-д ТОДООР
   хадгалагдахгүйн тулд AES-256-GCM-ээр шифрлэнэ. DB dump/leak гарсан ч
   HEARING_PROFILE_ENC_KEY (тусдаа, backend процессын орчинд л байрлах нууц)
   байхгүй бол утга уншигдахгүй.

   Формат: "v1:<iv-hex>:<authTag-hex>:<ciphertext-hex>" — хувилбарын угтвар
   ирээдүйд алгоритм солиход хуучин мөрүүдийг таних боломж үлдээнэ. */
const ALGORITHM = 'aes-256-gcm';
const VERSION_PREFIX = 'v1';
const IV_LENGTH = 12;

function deriveKey(secret: string): Buffer {
  // scrypt: хэрэглэгчийн өгсөн ямар ч урттай нууц үгийг тогтмол 32 байт key болгоно.
  return scryptSync(secret, 'medreh-hearing-profile-salt', 32);
}

export function encryptField(plaintext: string, secret: string): string {
  const key = deriveKey(secret);
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${VERSION_PREFIX}:${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptField(ciphertext: string, secret: string): string {
  const parts = ciphertext.split(':');
  if (parts.length !== 4 || parts[0] !== VERSION_PREFIX) {
    // Шифрлэлт нэвтрүүлэхээс өмнөх хуучин ТОД мөрүүд (migration хийгдээгүй өгөгдөл) —
    // тэдгээрийг шифрлэгдээгүй тод текст гэж үзээд шууд буцаана.
    return ciphertext;
  }
  const [, ivHex, authTagHex, dataHex] = parts;
  const key = deriveKey(secret);
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(dataHex, 'hex')), decipher.final()]);
  return decrypted.toString('utf8');
}
