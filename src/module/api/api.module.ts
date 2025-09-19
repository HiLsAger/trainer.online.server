import { Global, Module } from "@nestjs/common";
import ApiFacade from "./api.facade";
import StylesApi from "./styles/styles.api";
import { SequelizeModule } from "@nestjs/sequelize";
import { Style } from "../database/models/style.model";
import StyleBuilder from "./styles/style.builder";

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Style])],
  providers: [ApiFacade, StylesApi, StyleBuilder],
  exports: [ApiFacade, StyleBuilder],
})
export default class ApiModule {}
