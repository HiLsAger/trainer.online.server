import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../datebase/models/user.model";
import { UserInput, UserLoginInput } from "../datebase/model.inputs/user.input";
import { AuthToken } from "../datebase/models/authTokens.model";
import { authTokenResponse } from "./auth.interfaces";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import authPermissions from "../guards/permission/permissions/auth.permission";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get("user")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(authPermissions.GetUser, Article),
  )
  async user(
    @Auth()
    token: AuthToken,
    @Query("login") login: string,
  ): Promise<User> {
    return this.service.getUserByLogin(login);
  }

  @Post("register")
  async register(
    @Ip() ip: string,
    @Body() body: UserInput,
  ): Promise<authTokenResponse> {
    return this.service.register(ip, body);
  }

  @Post("login")
  async login(
    @Ip() ip: string,
    @Body() body: UserLoginInput,
  ): Promise<authTokenResponse> {
    return this.service.login(ip, body);
  }
}
