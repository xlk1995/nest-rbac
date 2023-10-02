import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// id name desc createTime updateTime
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  desc: string;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
}
