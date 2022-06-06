import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { TwilioService } from '../../twilio/twilio.service';
import { ForgotPasswordOTP } from '../entities/forgot_password_otp.entity';
import { User } from '../entities/user.entity';
import { ForgotPasswordTokenService } from './forgot_password_token.service';

@Injectable()
export class ForgotPasswordOTPService {
  constructor(
    @InjectRepository(ForgotPasswordOTP)
    private forgotPasswordOTPRepository: Repository<ForgotPasswordOTP>,
    private twilioService: TwilioService,
    private forgotPasswordTokenService: ForgotPasswordTokenService,
  ) {}

  async sendOTP(user: User, body?: string) {
    if (!body) {
      const forgotPasswordOTP = ForgotPasswordOTP.create({
        user_id: user.id,
        otp: `${Math.floor(Math.random() * (999999 - 100000)) + 100000}`,
      });
      await this.forgotPasswordOTPRepository.save(forgotPasswordOTP);
      body = `Your OTP is ${forgotPasswordOTP.otp}.`;
    }
    return this.twilioService.sendSms(
      `+${user.country_code}${user.phone_no}`,
      body,
    );
  }

  // Verify otp and return token to reset password
  async verifyOTP(user: User, otp: string) {
    const forgotPasswordOTP = await this.forgotPasswordOTPRepository.findOne({
      where: {
        user_id: user.id,
        otp,
        used: false,
        created_at: MoreThanOrEqual(new Date(Date.now() - 5 * 60 * 1000)),
      },
    });
    if (!forgotPasswordOTP) {
      return null;
    }
    await this.forgotPasswordOTPRepository.update(
      { id: forgotPasswordOTP.id },
      { used: true },
    );
    return (await this.forgotPasswordTokenService.create(user)).token;
  }
}
