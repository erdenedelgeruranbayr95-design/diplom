import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { JamendoService } from './jamendo.service';
import { HapticModule } from '../haptic/haptic.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [HapticModule, StorageModule],
  controllers: [SongsController],
  providers: [SongsService, JamendoService],
})
export class SongsModule {}
