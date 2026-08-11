import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  /* `SongsController` нь дуу нэмэгчийн уран бүтээлчийн профайлыг олоход ашиглана. */
  exports: [ArtistsService],
})
export class ArtistsModule {}
