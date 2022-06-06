import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../../config/app.config';
import databaseConfig from '../../config/database.config';
import { Module } from '@nestjs/common';
import { TestTypeOrmConfigService } from '../test-typeorm-config.service';
import { setConfig } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
  ],
  providers: [TestTypeOrmConfigService],
})
class AppModule {}

void setConfig(TestTypeOrmConfigService, AppModule, 'ormconfig.test.json');
