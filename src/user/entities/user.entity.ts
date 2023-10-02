import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

// User的字段： id,username,password, createTime,updateTime,
// 标记这个类是一个实体
@Entity()
export class User {
  // 主键
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  username: string;

  @Column({
    length: 50,
  })
  password: string;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
  // 多对多 用户和角色表多对多
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[];
}
