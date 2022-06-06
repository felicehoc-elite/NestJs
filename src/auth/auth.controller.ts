import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import {
  // AuthRegisterDto,
  AuthLoginDto,
  CreateUserWithEmailDto,
  EmailCheckDto,
  confirmEmailDto,
  mobileDto,
} from './dto/auth-register-login.dto';
import {
  ForgotPasswordDto,
  SendForgotMailDto,
  SendForgotOTPDto,
  VerifyForgotPasswordOTPDto,
} from './dto/auth-forgot-password.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  // @Post('email/register')
  // @HttpCode(HttpStatus.CREATED)
  // async register(@Body() createUserDto: AuthRegisterDto) {
  //   return this.service.register(createUserDto);
  // }

  @Post('email/register-with-email')
  @HttpCode(HttpStatus.CREATED)
  async registerWithEmail(
    @Body() createUserWithEmailDto: CreateUserWithEmailDto,
  ) {
    return this.service.registerWithEmail(createUserWithEmailDto);
  }

  @Post('email/exist-check')
  @HttpCode(HttpStatus.OK)
  public emailExistCheck(@Body() emailCheckDto: EmailCheckDto) {
    const { email } = emailCheckDto;
    return this.service.emailExistCheck(email);
  }

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: AuthLoginDto) {
    return this.service.validateLogin(loginDto);
  }

  @Post('email/send-forgot-mail')
  @HttpCode(HttpStatus.OK)
  public async sendForgotMail(@Body() sendForgotMailDto: SendForgotMailDto) {
    return this.service.sendForgotMail(sendForgotMailDto);
  }

  @Post('update-forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updatePassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.service.updatePassword(forgotPasswordDto);
  }

  @Post('email/send-verification-email')
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail(@Body() email: EmailCheckDto) {
    return this.service.sendMail(email);
  }

  @Post('email/confirm-email')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body() email: confirmEmailDto) {
    return this.service.confirmMail(email);
  }

  @Post('email/send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() phoneNumber: mobileDto) {
    return this.service.sendOtp(phoneNumber);
  }

  @Post('phone/send-forgot-otp')
  @HttpCode(HttpStatus.NO_CONTENT)
  async sendForgotPasswordOTP(@Body() phoneNumberDto: SendForgotOTPDto) {
    return this.service.sendForgotPasswordOTP(phoneNumberDto);
  }

  @Post('phone/verify-forgot-otp')
  @HttpCode(HttpStatus.ACCEPTED)
  async verifyForgotPasswordOTP(@Body() verifyDto: VerifyForgotPasswordOTPDto) {
    return this.service.verifyForgotPasswordOTP(verifyDto);
  }
}
