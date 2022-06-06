import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { IsValidPassword } from '../../utils/validators';

export class SendForgotMailDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'password' })
  @MinLength(8)
  @IsValidPassword()
  password: string;

  @ApiProperty({ example: 'aValidJwtTokenFromEmail' })
  @IsString()
  token: string;
}

export class SendForgotOTPDto {
  @ApiProperty({ example: '12345678' })
  @IsNumber()
  phone_no: number;

  @ApiProperty({ example: '91' })
  @IsNumber()
  country_code: number;
}

export class VerifyForgotPasswordOTPDto extends SendForgotOTPDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  otp: string;
}
