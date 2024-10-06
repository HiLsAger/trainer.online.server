import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from "./models";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      database: "nest-crm",
      host: "localhost",
      models: models,
      username: "hils",
      password: "0497",
    }),
  ],
})
export class DatebaseModule {}
