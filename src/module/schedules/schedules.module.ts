import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthToken } from "../database/models/authTokens.model";
import ConfigModule from "../config/config.module";
import ScheduleController from "./schedule.controller";
import SchedulesService from "./schedules.service";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { AuthGuardService } from "../guards/auth/auth.guard.service";

@Module({
  imports: [SequelizeModule.forFeature([AuthToken]), ConfigModule],
  controllers: [ScheduleController],
  providers: [SchedulesService, CaslAbilityFactory, AuthGuardService],
})
export default class SchedulesModule {}
