import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Get,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ThumbnailService } from './thumbnail.service';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Thumbnail } from './entities/thumbnail.entity';
import { CreateThumbnailDto } from './dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from './dto/update-thumbnail.dto';
import { infinityPagination } from '../utils/infinity-pagination';

@ApiTags('Thumbnail')
@Controller({
  path: 'thumbnail',
  version: '1',
})
export class ThumbnailController {
  constructor(public service: ThumbnailService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createThumbnailDto: CreateThumbnailDto) {
    return this.service.create(createThumbnailDto);
  }

  @Get('/:thumbnailId')
  findThumbnailById(@Param('thumbnailId') id: number): Promise<Thumbnail> {
    return this.service.findThumbnailById(id);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.service.findThumbnailList({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Patch()
  updateThumbnailById(
    @Body() updateThumbnailDto: UpdateThumbnailDto,
  ): Promise<UpdateResult> {
    return this.service.updateThumbnailById(updateThumbnailDto);
  }
  @Delete()
  removeThumbnailById(@Body() id: number): Promise<void> {
    return this.service.removeThumbnailById(id);
  }
}
