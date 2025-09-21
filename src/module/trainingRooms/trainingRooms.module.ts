import { Module } from "@nestjs/common";
import TrainingsController from "../trainings/trainings.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { TrainingRoom } from "../database/models/trainingRoom.model";
import TrainingRoomsService from "./trainingRooms.service";
import { AuthToken } from "../database/models/authTokens.model";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import TrainingRoomsHelper from "./trainingRooms.helper";
import TrainingRoomsController from "./trainingRooms.controller";

@Module({
  imports: [SequelizeModule.forFeature([TrainingRoom, AuthToken])],
  controllers: [TrainingRoomsController],
  providers: [
    TrainingRoomsService,
    AuthGuardService,
    CaslAbilityFactory,
    TrainingRoomsHelper,
  ],
  exports: [AuthGuardService, CaslAbilityFactory, TrainingRoomsHelper],
})
export default class TrainingRoomsModule {}
