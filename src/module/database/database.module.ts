import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from "./models";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: "mysql",
        host: config.get("DB_HOST"),
        port: config.get<number>("DB_PORT"),
        database: config.get("DB_NAME"),
        username: config.get("DB_USER"),
        password: config.get("DB_PASSWORD"),
        models: models,
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
