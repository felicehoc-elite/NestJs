import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserSession,
  ForgotPasswordOTP,
  ForgotPasswordToken,
  User,
} from './entities';
import {
  ForgotPasswordOTPService,
  UsersService,
  ForgotPasswordTokenService,
} from './services';
import { TwilioModule } from '../twilio/twilio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ForgotPasswordToken,
      UserSession,
      ForgotPasswordOTP,
    ]),
    TwilioModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ForgotPasswordTokenService,
    ForgotPasswordOTPService,
  ],
  exports: [UsersService, ForgotPasswordTokenService, ForgotPasswordOTPService],
})
export class UsersModule {}
