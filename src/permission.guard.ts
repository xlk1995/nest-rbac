import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Permission } from './user/entities/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;
  @Inject(Reflector)
  private reflector: Reflector;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.user) {
      return true;
    }
    const roles = await this.userService.findRolesByIds(
      request.user.roles.map((item) => item.id),
    );
    const permissions: Permission[] = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);
    console.log('当前用户的权限', permissions);
    const requirePermissions = this.reflector.getAllAndOverride(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );
    console.log('需要的权限', requirePermissions);

    for (let i = 0; i < requirePermissions.length; i++) {
      const curPermission = requirePermissions[i];
      console.log(curPermission, '======');
      console.log(permissions, 'ppppp');

      const found = permissions.find((item) => item.name === curPermission);
      console.log(found, '-----');

      if (!found) {
        throw new UnauthorizedException('您没有该接口的操作权限');
      }
    }
    return true;
  }
}
