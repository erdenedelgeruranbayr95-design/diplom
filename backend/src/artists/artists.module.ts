import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsService } from './albums.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  /* Цомгийн ковер зураг presigned upload-аар ирдэг тул key → нийтийн URL хөрвүүлэхэд. */
  imports: [StorageModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService],
  /* `SongsController` нь дуу нэмэгчийн уран бүтээлчийн профайлыг олоход ашиглана. */
  exports: [ArtistsService],
})
export class ArtistsModule {}
