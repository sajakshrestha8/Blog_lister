import { IsEmail, IsStrongPassword } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
