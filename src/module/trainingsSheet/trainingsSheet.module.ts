import { Module } from "@nestjs/common";
import TrainingsSheetController from "./trainingsSheet.controller";
import TrainingsSheetService from "./trainingsSheet.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Setting } from "../database/models/setting.model";
import { AuthToken } from "../database/models/authTokens.model";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import ConfigModule from "../config/config.module";

@Module({
  imports: [SequelizeModule.forFeature([Setting, AuthToken]), ConfigModule],
  controllers: [TrainingsSheetController],
  providers: [TrainingsSheetService, CaslAbilityFactory, AuthGuardService],
})
export default class TrainingsSheetModule {}
