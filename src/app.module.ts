import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ModuleModules } from "./module/Modules.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ModuleModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
