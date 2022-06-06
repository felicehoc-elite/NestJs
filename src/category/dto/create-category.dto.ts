import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'love' })
  @IsNotEmpty()
  @MinLength(3)
  name: string | null;
}
