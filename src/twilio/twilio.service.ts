import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  constructor(private configService: ConfigService) {}

  async getClient() {
    return new Twilio(
      this.configService.get('twilio.sid'),
      this.configService.get('twilio.auth_token'),
    );
  }

  async sendSms(to: string, body: string) {
    const client = await this.getClient();
    return client.messages.create({
      from: this.configService.get('twilio.from'),
      body,
      to,
    });
  }
}
