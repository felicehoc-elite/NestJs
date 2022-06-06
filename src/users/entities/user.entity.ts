import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  // BeforeInsert,
  // BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from '../../utils/entity-helper';
import { UserSession } from './session.entity';
import { ForgotPasswordToken } from './forgot_password_token.entity';
import { ForgotPasswordOTP } from './forgot_password_otp.entity';

@Entity({ name: 'users' })
export class User extends EntityHelper {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_no: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  country_code: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  phone_verified: boolean;

  @Column({ default: false })
  is_active: boolean;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => UserSession, (sessions) => sessions.user)
  sessions: Promise<UserSession[]>;

  @OneToMany(() => ForgotPasswordToken, (tokens) => tokens.user)
  forgot_password_tokens: Promise<ForgotPasswordToken[]>;

  @OneToMany(() => ForgotPasswordOTP, (otps) => otps.user)
  forgot_password_otps: Promise<ForgotPasswordOTP[]>;

  // @BeforeInsert()
  // @BeforeUpdate()
  async encryptPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  async lowerCaseEmail() {
    this.email = this.email.toLowerCase();
  }

  async setBeforeUpdate() {
    await this.encryptPassword();
    await this.lowerCaseEmail();
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
