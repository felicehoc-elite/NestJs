import { registerAs } from '@nestjs/config';

export default registerAs('twilio', () => ({
  sid: process.env.TWILIO_ACCOUNT_SID,
  auth_token: process.env.TWILIO_AUTH_TOKEN,
  from: process.env.TWILIO_FROM_NUMBER,
}));
