import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/services';
import { MailService } from '../mail/mail.service';
import {
  // AuthRegisterDto,
  AuthLoginDto,
  CreateUserWithEmailDto,
  EmailCheckDto,
  confirmEmailDto,
  mobileDto,
} from './dto/auth-register-login.dto';
import * as bcrypt from 'bcryptjs';
import {
  ForgotPasswordDto,
  SendForgotMailDto,
  SendForgotOTPDto,
  VerifyForgotPasswordOTPDto,
} from './dto/auth-forgot-password.dto';
import { ForgotPasswordTokenService } from '../users/services/forgot_password_token.service';
import { ForgotPasswordOTPService } from '../users/services/forgot_password_otp.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private mailService: MailService,
    private forgotPasswordTokenService: ForgotPasswordTokenService,
    private forgotPasswordOTPService: ForgotPasswordOTPService,
  ) {}

  async registerWithEmail(dto: CreateUserWithEmailDto) {
    const user = await this.usersService.create(dto);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          message: {
            res_msg: 'register done',
          },
        },
        HttpStatus.OK,
      );
    }
    const hash = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '1d',
      },
    );
    await this.mailService.userSignUp({ to: user.email, data: { hash } });
    return !!user;
  }

  async emailExistCheck(email: string): Promise<boolean> {
    const user = await this.usersService.findOne({
      email: email,
    });
    if (user) {
      throw new HttpException(
        {
          message: {
            email: 'already registered',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(null, HttpStatus.OK);
  } // send verification mail
  async sendMail(dto: EmailCheckDto) {
    const payload = { email: dto.email };
    const options = { issuer: process.env.AUTH_JWT_TOKEN_ISSUER };
    const hash = this.jwtService.sign(payload, options);
    await this.mailService.userSignUp({ to: dto.email, data: { hash } });
    return !!dto;
  }

  // confirm mail id and update the email_verified field
  async confirmMail(dto: confirmEmailDto) {
    const options = {
      secret: process.env.AUTH_JWT_SECRET,
      expiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
      issuer: process.env.AUTH_JWT_TOKEN_ISSUER,
    };

    const result = this.jwtService.verify(dto.token, options);

    if (result.email == dto.email) {
      const user = await this.usersService.findOne({ email: dto.email });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'Email id not exists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        const obj = { email_verified: true };
        const user_register = await this.usersService.update(user.id, obj);

        if (user_register) {
          throw new HttpException(
            {
              status: HttpStatus.OK,
              message: {
                res_msg: 'Email verified successfully ...',
              },
            },
            HttpStatus.OK,
          );
        }
      }
      return true;
    } else {
      return false;
    }
  }

  // send otp on mobile
  async sendOtp(phoneNumber: mobileDto) {
    const client = require('twilio')(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );

    client.messages
      .create({
        body: 'Otp will be expire in next 5 minutes',
        from: '+4132166148',
        to: '+380968848869',
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log('err', err));
  }

  async validateLogin(
    loginDto: AuthLoginDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id,
        email: user.email,
      });

      return { token, user: user };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async sendForgotMail(sendForgotMailDto: SendForgotMailDto) {
    const user = await this.usersService.findOne({
      email: sendForgotMailDto.email.toLowerCase(),
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'Email not Found',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const forgotPasswordToken = await this.forgotPasswordTokenService.create(
      user,
    );

    await this.mailService.forgotPassword({
      to: user.email,
      data: { hash: forgotPasswordToken.token },
    });

    return { message: `Email sent successfully, expires in 1h` };
  }

  async updatePassword(passwordResetDto: ForgotPasswordDto) {
    const token = await this.forgotPasswordTokenService.findOne({
      token: passwordResetDto.token,
    });

    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            token: 'Invalid Token Provided.',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    token.used = true;

    const user = await token.user;
    // Encyprt the code
    user.password = passwordResetDto.password;
    await user.setBeforeUpdate();
    return !!((await user.save()) && (await token.save()));
  }

  async sendForgotPasswordOTP(phoneNumberDto: SendForgotOTPDto) {
    const user = await this.usersService.findOne({
      phone_no: phoneNumberDto.phone_no,
      country_code: phoneNumberDto.country_code,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            phone_no: 'Phone number not found',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.forgotPasswordOTPService.sendOTP(user);
    return true;
  }

  async verifyForgotPasswordOTP(verifyDto: VerifyForgotPasswordOTPDto) {
    const user = await this.usersService.findOne({
      phone_no: verifyDto.phone_no,
      country_code: verifyDto.country_code,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            phone_no: 'Phone number not found',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const token = await this.forgotPasswordOTPService.verifyOTP(
      user,
      verifyDto.otp,
    );
    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            otp: 'Invalid OTP',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return token;
  }
}
