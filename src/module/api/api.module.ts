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

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Style, User, TrainingRoom])],
  providers: [ApiFacade, StylesApi, StyleBuilder, UsersApi, TrainingRoomsApi],
  exports: [ApiFacade, StyleBuilder],
})
export default class ApiModule {}
