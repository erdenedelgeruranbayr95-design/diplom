import { IsString, MinLength } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @MinLength(1)
  name: string;
}

export class RenamePlaylistDto {
  @IsString()
  @MinLength(1)
  name: string;
}

export class AddPlaylistTrackDto {
  @IsString()
  @MinLength(1)
  songId: string;
}
