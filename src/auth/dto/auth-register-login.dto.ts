import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  MinLength,
  Validate,
  IsNotEmpty,
  isNotEmpty,
} from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsValidPassword } from '../../utils/validators/is-valid-password.validator';
import { Transform } from 'class-transformer';

export class AuthRegisterDto {
  @ApiProperty({ example: 'test@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @MinLength(8)
  password: string;
}

export class CreateUserWithEmailDto {
  @ApiProperty({ example: 'test@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  email: string;

  @ApiProperty({ example: 'password' })
  @MinLength(8)
  @IsValidPassword()
  password: string;
}

export class AuthLoginDto {
  @ApiProperty({ example: 'test@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @MinLength(8)
  @IsValidPassword()
  password: string;
}

export class EmailCheckDto {
  @ApiProperty({ example: 'email' })
  @IsEmail()
  email: string;
}

export class confirmEmailDto {
  @ApiProperty({ example: 'test@mailinator.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'eybsmjj....' })
  @IsNotEmpty()
  token: string;
}

export class mobileDto {
  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  phoneNumber: string;
}
