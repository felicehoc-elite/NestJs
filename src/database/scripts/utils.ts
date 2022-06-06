import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';

export const setConfig = async (
  TestTypeOrmConfigService: any,
  AppModule: any,
  file_name = 'ormconfig.json',
) => {
  const app = await NestFactory.create(AppModule);
  const typeOrmServiceConfig = app.get(TestTypeOrmConfigService);
  fs.writeFileSync(
    file_name,
    JSON.stringify(typeOrmServiceConfig.createTypeOrmOptions(), null, 2),
  );
  await app.close();
};
