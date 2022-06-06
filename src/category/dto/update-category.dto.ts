import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'love' })
  @IsNotEmpty()
  @MinLength(3)
  name: string | null;
}
