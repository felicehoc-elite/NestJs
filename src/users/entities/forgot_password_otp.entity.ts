import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from './user.entity';

@Entity({ name: 'forgot_password_otps' })
export class ForgotPasswordOTP extends EntityHelper {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column()
  otp: string;

  @Column({ default: false })
  used: boolean;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (users) => users.forgot_password_otps)
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
