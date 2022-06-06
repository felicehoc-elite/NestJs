import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Thumbnail } from './entities/thumbnail.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateThumbnailDto } from './dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from './dto/update-thumbnail.dto';

@Injectable()
export class ThumbnailService {
  constructor(
    @InjectRepository(Thumbnail)
    private thumbnailRepository: Repository<Thumbnail>,
  ) {}

  async create(createThumbnailDto: CreateThumbnailDto): Promise<void> {
    const thumbnail = await this.thumbnailRepository.findOne({
      img_path: createThumbnailDto.img_path,
    });

    if (thumbnail) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            message: 'Same thumbnils already exist',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      const result = await this.thumbnailRepository.save(
        this.thumbnailRepository.create(createThumbnailDto),
      );
      if (result) {
        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: {
              msg: 'registed new thumbnail',
            },
          },
          HttpStatus.OK,
        );
      }
    }
  }

  async findThumbnailById(id: number): Promise<Thumbnail> {
    const selectedThumbnail: Thumbnail = await this.thumbnailRepository.findOne(
      { id },
    );

    if (selectedThumbnail) {
      return selectedThumbnail;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            message: `these is no thumbnail with ${id}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  findThumbnailList(paginationOptions: IPaginationOptions) {
    return this.thumbnailRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async updateThumbnailById(
    updateThumbnailDto: UpdateThumbnailDto,
  ): Promise<UpdateResult> {
    return await this.thumbnailRepository.update(
      updateThumbnailDto.id,
      updateThumbnailDto,
    );
  }

  async removeThumbnailById(id: number): Promise<void> {
    await this.thumbnailRepository.delete(id);
  }
}
