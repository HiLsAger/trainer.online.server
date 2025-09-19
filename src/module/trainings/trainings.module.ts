import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import TrainingsController from "./trainings.controller";
import TrainingsService from "./trainings.service";
import { Training } from "../database/models/training.model";
import { AuthToken } from "../database/models/authTokens.model";
import TrainingsHelper from "./trainings.helper";

@Module({
  imports: [SequelizeModule.forFeature([Training, AuthToken])],
  providers: [
    CaslAbilityFactory,
    AuthGuardService,
    TrainingsService,
    TrainingsHelper,
  ],
  exports: [AuthGuardService, CaslAbilityFactory, TrainingsHelper],
  controllers: [TrainingsController],
})
export class TrainingsModule {}
