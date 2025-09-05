import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
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
import { UserData, UserInputForm } from "../datebase/model.inputs/user.input";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";

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
  async user(@Auth() token: AuthToken, @Query("id") id: number): Promise<Form> {
    return this.service.getUsersForm(id);
  }

  @Post("user")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(usersPermissions.UpdateUser, Article),
  )
  async updateUser(
    @Auth() token: AuthToken,
    @Body() user: UserInputForm,
    @Query("id") id: number = null,
  ): Promise<UserData> {
    if (id || user.id) {
      return await this.service.updateUser(user, id);
    }

    return await this.service.insertUser(user);
  }

  @Delete("delete")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(usersPermissions.DeleteUser, Article),
  )
  async deleteUser(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<string> {
    return await this.service.deleteUser(id);
  }
}
