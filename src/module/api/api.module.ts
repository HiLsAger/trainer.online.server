import { Global, Module } from "@nestjs/common";
import ApiFacade from "./api.facade";
import StylesApi from "./styles/styles.api";
import { SequelizeModule } from "@nestjs/sequelize";
import { Style } from "../database/models/style.model";
import StyleBuilder from "./styles/style.builder";
import UsersApi from "./users/users.api";
import { User } from "../database/models/user.model";
import TrainingRoomsApi from "./trainingRooms/trainingRooms.api";
import { TrainingRoom } from "../database/models/trainingRoom.model";
import { Setting } from "../database/models/setting.model";
import SettingsApi from "./settings/settings.api";
import { Training } from "../database/models/training.model";
import TrainingsApi from "./trainings/trainings.api";
import SchedulesApi from "./schedules/schedules.api";
import { Schedule } from "../database/models/schedule.model";

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
      Style,
      User,
      TrainingRoom,
      Setting,
      Training,
      Schedule,
    ]),
  ],
  providers: [
    ApiFacade,
    StylesApi,
    StyleBuilder,
    UsersApi,
    TrainingRoomsApi,
    SettingsApi,
    TrainingsApi,
    SchedulesApi,
  ],
  exports: [ApiFacade, StyleBuilder],
})
export default class ApiModule {}
