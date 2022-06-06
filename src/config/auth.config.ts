import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  forgot_password_token_expires: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_TIME,
  forgot_password_otp_expires: process.env.FORGOT_PASSWORD_OTP_EXPIRE_TIME,
}));
