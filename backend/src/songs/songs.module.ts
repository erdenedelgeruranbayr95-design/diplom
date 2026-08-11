import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { JamendoService } from './jamendo.service';
import { FmaService } from './fma.service';
import { CatalogSeedService } from './catalog-seed.service';
import { HapticModule } from '../haptic/haptic.module';
import { StorageModule } from '../storage/storage.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [HapticModule, StorageModule, ArtistsModule],
  controllers: [SongsController],
  providers: [SongsService, JamendoService, FmaService, CatalogSeedService],
})
export class SongsModule {}
