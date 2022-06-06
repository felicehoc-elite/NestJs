import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateThumbnailDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @MinLength(4)
  img_path: string;
}
