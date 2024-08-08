import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../datebase/models/user.model';
import { UserInput, UserLoginInput } from '../datebase/model.inputs/user.input';
import { AuthTocken } from '../datebase/models/authTokens.model';
import { authTokenResponse } from './auth.interfaces';
import { Auth, AuthGuard } from '../guards/auth/auth.guard';
import {
  Permission,
  PermissionGuard,
} from '../guards/permission/permission.guard';
import {
  Action,
  AppAbility,
  Article,
} from '../guards/permission/casl-ability.factory';
import { ApiHeader } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('user')
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) => ability.can(Action.GetUser, Article))
  async user(
    @Auth()
    token: AuthTocken,
    @Query('login') login: string,
  ): Promise<User> {
    return this.service.getUserByLogin(login);
  }

  @Post('register')
  async register(
    @Ip() ip: string,
    @Body() body: UserInput,
  ): Promise<authTokenResponse> {
    return this.service.register(ip, body);
  }

  @Post('login')
  async login(
    @Ip() ip: string,
    @Body() body: UserLoginInput,
  ): Promise<authTokenResponse> {
    return this.service.login(ip, body);
  }
}
