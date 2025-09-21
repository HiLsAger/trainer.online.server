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
import TrainingRoomsService from "./trainingRooms.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { Actions } from "../guards/permission/permissions/actionsValues";
import { AuthToken } from "../database/models/authTokens.model";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import { TrainingRoomsInput } from "../database/model.inputs/trainingRooms.input";

@ApiTags("Работа с залами")
@Controller("training-rooms")
export default class TrainingRoomsController {
  constructor(protected readonly service: TrainingRoomsService) {}

  @Get("grid")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.GetTrainingRooms, Article),
  )
  async grid(
    @Auth() token: AuthToken,
    @Query("limit") limit: number = 50,
    @Query("page") page: number = 1,
    @Query("filters") filters: Filter | null,
  ): Promise<Grid> {
    return this.service.getGrid(limit, page, filters);
  }

  @Get("room")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.GetTrainingRooms, Article),
  )
  async gridItem(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<Form> {
    return this.service.getForm(id);
  }

  @Post("room")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.UpdateTrainingRooms, Article),
  )
  async postRole(
    @Auth() token: AuthToken,
    @Body() data: TrainingRoomsInput,
    @Query("id") id: number = null,
  ): Promise<TrainingRoomsInput> {
    return await this.service.upsert(data, id);
  }

  @Delete("room")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.DeleteTrainingRooms, Article),
  )
  async delete(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<string> {
    return await this.service.delete(id);
  }
}
