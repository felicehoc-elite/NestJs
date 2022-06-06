import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ThumbnailModule } from './Thumbnail/thumbnail.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { I18nJsonParser } from 'nestjs-i18n/dist/parsers/i18n.json.parser';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailConfigService } from './mail/mail-config.service';
import { MailModule } from './mail/mail.module';
import twilioConfig from './config/twilio.config';

export const globalImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [
      databaseConfig,
      authConfig,
      appConfig,
      mailConfig,
      fileConfig,
      twilioConfig,
    ],
    envFilePath: ['.env'],
  }),
  MailerModule.forRootAsync({
    useClass: MailConfigService,
  }),
  I18nModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      fallbackLanguage: configService.get('app.fallbackLanguage'),
      parserOptions: {
        path: path.join(
          configService.get('app.workingDirectory'),
          'src',
          'i18n',
          'translations',
        ),
      },
    }),
    parser: I18nJsonParser,
    inject: [ConfigService],
    resolvers: [new HeaderResolver(['x-custom-lang'])],
  }),
];

const moduleImports = [
  UsersModule,
  FilesModule,
  AuthModule,
  MailModule,
  CategoryModule,
  ThumbnailModule,
];
@Module({
  imports: [
    ...globalImports,
    ...moduleImports,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class AppModule {}
