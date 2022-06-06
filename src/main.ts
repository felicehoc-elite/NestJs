import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createApplication } from './utils/bootstrap';
//
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const createApp = createApplication(app);
  await createApp.listen(configService.get('app.port'));
}

void bootstrap();
