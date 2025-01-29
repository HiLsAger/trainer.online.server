import { Controller, Get, Query, UseGuards } from "@nestjs/common";
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
import { Filter, Grid } from "./users.intefrace";
import { Form } from "../../components/form/form.interface";

@ApiTags("Работа с пользователями")
@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get("grid")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(usersPermissions.GetUsers, Article),
  )
  async grid(
    @Auth() token: AuthToken,
    @Query("limit") limit: number = 50,
    @Query("page") page: number = 1,
    @Query("filters") filters: Filter | null,
  ): Promise<Grid> {
    return this.service.getUsersGrid(limit, page, filters);
  }

  @Get("user")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(usersPermissions.GetUsers, Article),
  )
  @Permission((ability: AppAbility) =>
    ability.can(usersPermissions.UpdateUser, Article),
  )
  async user(@Auth() token: AuthToken, @Query("id") id: number): Promise<Form> {
    return this.service.getUsersForm(id);
  }
}
