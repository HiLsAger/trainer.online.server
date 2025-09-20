import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import StylesService from "./styles.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { AuthToken } from "../database/models/authTokens.model";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import { StyleInput } from "../database/model.inputs/style.input";
import { Actions } from "../guards/permission/permissions/actionsValues";

@ApiTags("Работа со стилями")
@Controller("styles")
export default class StylesController {
  constructor(private readonly service: StylesService) {}

  @Get("grid")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) => ability.can(Actions.GetStyles, Article))
  async grid(
    @Auth() token: AuthToken,
    @Query("limit") limit: number = 50,
    @Query("page") page: number = 1,
    @Query("filters") filters: Filter | null,
  ): Promise<Grid> {
    return this.service.getGrid(limit, page, filters);
  }

  @Get("style")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) => ability.can(Actions.GetStyles, Article))
  async gridItem(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<Form> {
    return this.service.getForm(id);
  }

  @Post("style")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.UpdateStyles, Article),
  )
  async postRole(
    @Auth() token: AuthToken,
    @Body() style: StyleInput,
    @Query("id") id: number = null,
  ): Promise<StyleInput> {
    return await this.service.upsert(style, id);
  }

  @Delete("style")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.DeleteStyles, Article),
  )
  async delete(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<string> {
    return await this.service.delete(id);
  }
}
