import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { ForgotPasswordToken } from '../entities/forgot_password_token.entity';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ForgotPasswordTokenService {
  constructor(
    @InjectRepository(ForgotPasswordToken)
    private forgotPasswordTokenRepository: Repository<ForgotPasswordToken>,
    private configService: ConfigService,
  ) {}

  findOne(fields: EntityCondition<ForgotPasswordToken>) {
    return this.forgotPasswordTokenRepository.findOne({
      where: {
        created_at: Raw(
          (alias) =>
            `${alias} > NOW() - INTERVAL '${this.configService.get(
              'auth.forgot_password_token_expires',
            )}' HOUR`,
        ),
        used: false,
        ...fields,
      },
    });
  }

  create(user: User) {
    const token = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    return this.forgotPasswordTokenRepository.save(
      ForgotPasswordToken.create({ user_id: user.id, token }),
    );
  }
}
