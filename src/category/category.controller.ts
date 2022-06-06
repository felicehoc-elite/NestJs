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
import { CategoryService } from './category.service';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { infinityPagination } from '../utils/infinity-pagination';

@ApiTags('Category')
@Controller({
  path: 'category',
  version: '1',
})
export class CategoryController {
  constructor(public service: CategoryService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.service.create(createCategoryDto);
  }

  @Get('/:categoryId')
  findCategoryById(@Param('categoryId') id: number): Promise<Category> {
    return this.service.findCategoryById(id);
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
      await this.service.findCategoryList({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Patch()
  updateCategoryById(
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.service.updateCategoryById(updateCategoryDto);
  }
  @Delete()
  removeCategoryById(@Body() id: number): Promise<void> {
    return this.service.removeCategoryById(id);
  }
}
