import { Global, Module } from "@nestjs/common";
import ApiFacade from "./api.facade";
import StylesApi from "./styles/styles.api";
import { SequelizeModule } from "@nestjs/sequelize";
import { Style } from "../database/models/style.model";
import StyleBuilder from "./styles/style.builder";
import UsersApi from "./users/users.api";
import { User } from "../database/models/user.model";

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Style, User])],
  providers: [ApiFacade, StylesApi, StyleBuilder, UsersApi],
  exports: [ApiFacade, StyleBuilder],
})
export default class ApiModule {}
