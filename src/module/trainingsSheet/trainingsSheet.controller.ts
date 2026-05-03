import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Controller, Get, UseGuards } from "@nestjs/common";
import TrainingsSheetService from "./trainingsSheet.service";
import { AuthGuard } from "../guards/auth/auth.guard";
import {
  Permission,
  PermissionGuard,
} from "../guards/permission/permission.guard";
import { AppAbility, Article } from "../guards/permission/casl-ability.factory";
import { Actions } from "../guards/permission/permissions/actionsValues";

@ApiTags("Доска тренировок")
@Controller("trainings-sheet")
export default class TrainingsSheetController {
  constructor(protected service: TrainingsSheetService) {}

  @Get("settings")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard, PermissionGuard)
  @Permission((ability: AppAbility) =>
    ability.can(Actions.GetSettings, Article),
  )
  public getTableSettings(): Record<string, any> {
    return this.service.getTableSettings();
  }
}
