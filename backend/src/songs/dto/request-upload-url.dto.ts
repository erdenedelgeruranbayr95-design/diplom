import { IsIn, IsString, MinLength } from 'class-validator';

const ALLOWED_AUDIO_MIME = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/aac', 'audio/ogg', 'audio/flac'];

export class RequestUploadUrlDto {
  @IsString()
  @MinLength(1)
  filename: string;

  @IsIn(ALLOWED_AUDIO_MIME)
  contentType: string;
}
