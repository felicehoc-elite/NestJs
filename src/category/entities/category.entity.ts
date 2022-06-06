import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'category' })
export class Category extends EntityHelper {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
  @ApiProperty({ example: 'love' })
  @Column({ type: 'text', nullable: false, unique: true })
  name: string;
}
