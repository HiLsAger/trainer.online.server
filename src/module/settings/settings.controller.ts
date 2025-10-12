import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import Form from "../../packages/forms/interfaces/form.interface";
import SettingsService from "./settings.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import { PermissionGuard } from "../guards/permission/permission.guard";
import { AuthToken } from "../database/models/authTokens.model";

@ApiTags("Работа с настройками")
@Controller("settings")
export default class SettingsController {
  constructor(protected readonly service: SettingsService) {}

  @Get("groups-settings")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  public async getGroupsSettings(
    @Auth() token: AuthToken,
  ): Promise<Record<string, string>> {
    return this.service.getGroups();
  }

  @Get("settings-by-group")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  public async getSettingsFormByGroup(
    @Auth() token: AuthToken,
    @Query("group") group: string,
  ): Promise<Form> {
    return this.service.getSettingsByGroup(group);
  }

  @Post("setting")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  public async setSettings(
    @Auth() token: AuthToken,
    @Body() settings: Record<string, string>,
  ): Promise<string> {
    return await this.service.setSettings(settings);
  }
}
