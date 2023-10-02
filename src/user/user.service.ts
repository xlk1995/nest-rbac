import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUser } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;
  async initData() {
    const user1 = new User();
    user1.username = '张三';
    user1.password = '111111';
    const user2 = new User();
    user2.username = '李四';
    user2.password = '222222';
    const user3 = new User();
    user3.username = '王五';
    user3.password = '333333';

    const role1 = new Role();
    role1.name = '管理员';
    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.name = '增加aaaaa ';
    const permission2 = new Permission();
    permission2.name = '删除aaaaa ';
    const permission3 = new Permission();
    permission3.name = '修改aaaaa ';
    const permission4 = new Permission();
    permission4.name = '查询aaaaa ';
    const permission5 = new Permission();
    permission5.name = '增加bbbb ';
    const permission6 = new Permission();
    permission6.name = '删除bbbbb';
    const permission7 = new Permission();
    permission7.name = '修改bbbbb ';
    const permission8 = new Permission();
    permission8.name = '查询bbbbb ';

    user1.roles = [role1];
    user2.roles = [role2];

    role1.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ];

    role2.permissions = [permission1, permission2, permission3, permission4];
    await this.entityManager.save(Permission, [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ]);
    await this.entityManager.save(Role, [role1, role2]);
    await this.entityManager.save(User, [user1, user2, user3]);
  }

  async login(loginUser: LoginUser) {
    // 从数据库中根据用户名查询，能查到说明有这个用户，存在就判断密码， 符合即登录成功
    const user = await this.entityManager.findOne(User, {
      where: { username: loginUser.username },
      relations: {
        roles: true,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }
    if (user.password !== loginUser.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }
    return user;
  }
  async findRolesByIds(roleIds: number[]) {
    return await this.entityManager.find(Role, {
      where: {
        id: In(roleIds),
      },
      relations: {
        permissions: true,
      },
    });
  }
}
