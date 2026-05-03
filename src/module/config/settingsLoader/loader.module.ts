import { Global, Module } from "@nestjs/common";
import SettingsLoader from "./settings.loader";
import { SequelizeModule } from "@nestjs/sequelize";
import { Setting } from "../../database/models/setting.model";

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Setting])],
  providers: [SettingsLoader],
  exports: [SettingsLoader],
})
export default class LoaderModule {}
