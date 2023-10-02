import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

// id name createTime updateTime
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  name: string;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation',
  })
  permissions: Permission[];
}
