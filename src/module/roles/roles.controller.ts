import { RolesService } from "./roles.service";
import { Body, Controller, Delete, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import { AuthToken } from "../datebase/models/authTokens.model";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import rolesPermissions from "../guards/permission/permissions/roles.permission";
import { RoleInput } from "../datebase/model.inputs/role.input";

@ApiTags("Работа с ролями и их правами")
@Controller("roles")
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get("grid")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(rolesPermissions.GetRoles, Article),
  )
  async grid(
    @Auth() token: AuthToken,
    @Query("limit") limit: number = 50,
    @Query("page") page: number = 1,
    @Query("filters") filters: Filter | null,
  ): Promise<Grid> {
    return this.service.getGrid(limit, page, filters);
  }

  @Get("grid-item")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(rolesPermissions.GetRoles, Article),
  )
  async gridItem(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<Form> {
    return this.service.getForm(id);
  }

  @Post("role")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(rolesPermissions.UpdateRoles, Article),
  )
  async postRole(
    @Auth() token: AuthToken,
    @Body() user: RoleInput,
    @Query("id") id: number = null,
  ): Promise<RoleInput> {
    return id
      ? await this.service.update(user, id)
      : await this.service.insert(user);
  }

  @Delete("delete")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(rolesPermissions.DeleteRoles, Article),
  )
  async delete(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<string> {
    return await this.service.delete(id);
  }
}
