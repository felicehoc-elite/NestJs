import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Module({
  exports: [TwilioService],
  providers: [TwilioService],
})
export class TwilioModule {}
