import { Body, Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import usersPermissions from "../guards/permission/permissions/users.permission";
import { AuthToken } from "../datebase/models/authTokens.model";
import { Filter } from "./users.intefrace";

@ApiTags("Работа с пользователями")
@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get("user")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(usersPermissions.GetUsers, Article),
  )
  async users(
    @Auth() token: AuthToken,
    @Query("limit") limit: number = 50,
    @Query("page") page: number = 1,
    @Query("filters") filters: Filter | null,
  ) {
    return this.service.getUsers(limit, page, filters);
  }
}
