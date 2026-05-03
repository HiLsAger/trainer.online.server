import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import SchedulesService from "./schedules.service";
import { Auth, AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { Actions } from "../guards/permission/permissions/actionsValues";
import { AuthToken } from "../database/models/authTokens.model";
import ScheduleInput from "../database/model.inputs/schedule.input";

@ApiTags("Расписание")
@Controller("schedules")
export default class ScheduleController {
  constructor(protected readonly service: SchedulesService) {}

  @Post("schedule")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.UpdateSchedule, Article),
  )
  public async upsert(
    @Auth() token: AuthToken,
    @Body() body: ScheduleInput,
  ): Promise<ScheduleInput> {
    return await this.service.upsert(body, null);
  }

  @Post("schedule/:id")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.UpdateSchedule, Article),
  )
  public async update(
    @Auth() token: AuthToken,
    @Body() body: ScheduleInput,
    @Param("id") id: number,
  ): Promise<ScheduleInput> {
    return await this.service.upsert(body, body.id ?? id);
  }
}
