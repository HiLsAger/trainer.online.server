import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FieldsService } from "./fields.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import { PermissionGuard } from "../guards/permission/permission.guard";
import { AuthToken } from "../database/models/authTokens.model";
import { Role } from "../database/models/role.model";
import { Permission } from "../database/models/permission.model";

@ApiTags("Профиль")
@Controller("fields")
export class FieldsController {
  constructor(private readonly service: FieldsService) {}

  @Get("roles")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  async getRoles(@Auth() token: AuthToken): Promise<object> {
    return this.service.getData(Role.tableName);
  }

  @Get("permissions")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  async getPermissions(@Auth() token: AuthToken): Promise<object> {
    return this.service.getData(Permission.tableName);
  }
}
