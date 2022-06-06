import { Module } from '@nestjs/common';
import { ThumbnailController } from './thumbnail.controller';
import { ThumbnailService } from './thumbnail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thumbnail } from './entities/thumbnail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thumbnail])],
  controllers: [ThumbnailController],
  providers: [ThumbnailService],
  exports: [ThumbnailService],
})
export class ThumbnailModule {}
