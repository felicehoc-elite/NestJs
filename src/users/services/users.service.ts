import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, ObjectID, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CreateUserDto } from '../dto/create-user.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  create(createProfileDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<User>,
    updateProfileDto: QueryDeepPartialEntity<User>,
  ) {
    return this.usersRepository.update(criteria, updateProfileDto);
  }
}
