import { Global, Module } from "@nestjs/common";
import Config from "./config";
import ApiFacade from "../api/api.facade";

@Global()
@Module({
  providers: [ApiFacade],
  exports: [Config],
})
export default class ConfigModule {}
