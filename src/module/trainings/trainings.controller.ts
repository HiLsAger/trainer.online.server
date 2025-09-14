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
import TrainingsService from "./trainings.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { AuthToken } from "../database/models/authTokens.model";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import { TrainingInput } from "../database/model.inputs/training.input";
import { Actions } from "../guards/permission/permissions/actionsValues";

@ApiTags("Работа с тренировками")
@Controller("trainings")
export default class TrainingsController {
  constructor(private readonly service: TrainingsService) {}

  @Get("grid")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.GetTrainings, Article),
  )
  async grid(
    @Auth() token: AuthToken,
    @Query("limit") limit: number = 50,
    @Query("page") page: number = 1,
    @Query("filters") filters: Filter | null,
  ): Promise<Grid> {
    return this.service.getGrid(limit, page, filters);
  }

  @Get("training")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.GetTrainings, Article),
  )
  async gridItem(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<Form> {
    return this.service.getForm(id);
  }

  @Post("training")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.UpdateTrainings, Article),
  )
  async postRole(
    @Auth() token: AuthToken,
    @Body() training: TrainingInput,
    @Query("id") id: number = null,
  ): Promise<TrainingInput> {
    return await this.service.upsert(training, id);
  }

  @Delete("training")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.DeleteTrainings, Article),
  )
  async delete(
    @Auth() token: AuthToken,
    @Query("id") id: number,
  ): Promise<string> {
    return await this.service.delete(id);
  }
}
