import { IsString, MinLength } from 'class-validator';

/* Frontend Google Identity Services (`accounts.google.com/gsi/client`) JS SDK-ийн
   "Sign in with Google" товч дарахад буцаадаг ID token (JWT) — backend Google-ийн
   өөрийнх нь public key-ээр баталгаажуулна (см. auth.service.ts verifyGoogleIdToken). */
export class GoogleLoginDto {
  @IsString()
  @MinLength(1)
  idToken: string;
}
