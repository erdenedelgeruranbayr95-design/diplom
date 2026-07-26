import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';
import { BadRequestException } from '@nestjs/common';

export const songMulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_req, file, cb) => {
      const unique = randomBytes(16).toString('hex');
      cb(null, unique + extname(file.originalname));
    },
  }),
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (!/^audio\//.test(file.mimetype)) {
      cb(new BadRequestException('Зөвхөн аудио файл (mp3/wav) оруулна'), false);
      return;
    }
    cb(null, true);
  },
  limits: { fileSize: 25 * 1024 * 1024 },
};
