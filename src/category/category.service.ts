import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRopository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    const category = await this.categoryRopository.findOne({
      name: createCategoryDto.name,
    });

    if (category) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            message: 'Already registered',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      const result = await this.categoryRopository.save(
        this.categoryRopository.create(createCategoryDto),
      );
      if (result) {
        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: {
              res_msg: 'created category',
            },
          },
          HttpStatus.OK,
        );
      }
    }
  }

  async findCategoryById(id: number): Promise<Category> {
    const selectedCategory: Category = await this.categoryRopository.findOne({
      id,
    });

    if (!selectedCategory) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            message: `there is no category with ${id}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return selectedCategory;
  }

  findCategoryList(paginationOptions: IPaginationOptions) {
    return this.categoryRopository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async updateCategoryById(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRopository.update(
      updateCategoryDto.id,
      updateCategoryDto,
    );
  }
  async removeCategoryById(id: number): Promise<void> {
    await this.categoryRopository.delete(id);
  }
}
