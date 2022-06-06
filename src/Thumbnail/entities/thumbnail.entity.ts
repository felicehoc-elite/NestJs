import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tbumbnail' })
export class Thumbnail extends EntityHelper {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
  @ApiProperty({})
  @Column({ type: 'text', nullable: false, unique: true })
  img_path: string;
}
