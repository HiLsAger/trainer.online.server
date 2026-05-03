import { Global, Module } from "@nestjs/common";
import Config from "./config";
import TimeHelper from "./helpers/time.helper";
import LoaderModule from "./settingsLoader/loader.module";

@Global()
@Module({
  imports: [LoaderModule],
  providers: [Config, TimeHelper],
  exports: [Config, TimeHelper],
})
export default class ConfigModule {}
