import { PermissionsService } from "./permissions.service";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import { AuthToken } from "../database/models/authTokens.model";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import permissionsPermissions from "../guards/permission/permissions/permissions.permission";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";

@ApiTags("работа с правами")
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Get("grid")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(permissionsPermissions.GetPermissions, Article),
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
    ability.can(permissionsPermissions.GetPermissions, Article),
  )
  async gridItem(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<Form> {
    return this.service.getForm(id);
  }
}
