import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateThumbnailDto {
  @IsNotEmpty()
  @MinLength(4)
  img_path: string;
}
