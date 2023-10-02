import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUser } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;
  constructor(private readonly userService: UserService) {}
  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'deno';
  }
  @Post('login')
  async login(@Body() loginUser: LoginUser) {
    const user = await this.userService.login(loginUser);
    console.log(user);
    const token = this.jwtService.sign({
      user: {
        username: user.username,
        roles: user.roles,
      },
    });

    return {
      token,
    };
  }
}
