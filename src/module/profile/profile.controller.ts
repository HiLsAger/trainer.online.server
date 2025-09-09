import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthToken } from "../database/models/authTokens.model";
import { Profile } from "./profile.interface";
import authPermissions from "../guards/permission/permissions/auth.permission";
import profilePermissions from "../guards/permission/permissions/profile.permission";
import { ProfileEdit } from "../database/model.inputs/profile.input";

@ApiTags("Профиль")
@Controller("profile")
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get("info")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(authPermissions.GetUser, Article),
  )
  async info(
    @Auth() token: AuthToken,
    @Query("login") login: string,
  ): Promise<Profile> {
    return this.service.getProfileByLogin(login);
  }

  @Post("info")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(profilePermissions.EditStatus, Article),
  )
  async editInfo(
    @Auth() token: AuthToken,
    @Body() body: ProfileEdit,
  ): Promise<Profile> {
    return this.service.editProfileInfo(token.user, body);
  }
}
