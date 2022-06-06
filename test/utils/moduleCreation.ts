import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createApplication } from '../../src/utils/bootstrap';
import { globalImports } from '../../src/app.module';
import { TestTypeOrmConfigService } from '../../src/database/test-typeorm-config.service';

export const createModule = async (modules: any[]) => {
  return await Test.createTestingModule({
    imports: [
      ...globalImports,
      ...modules,
      TypeOrmModule.forRootAsync({
        useClass: TestTypeOrmConfigService,
      }),
    ],
  }).compile();
};

export const getApplication = async (module: TestingModule) => {
  return createApplication(module.createNestApplication());
};

export const getTestServer = async (modules: any[]) => {
  const module = await createModule(modules);
  const app = await getApplication(module);
  await app.init();
  return app.getHttpServer();
};
