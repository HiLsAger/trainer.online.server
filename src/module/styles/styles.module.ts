import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import StylesController from "./styles.controller";
import StylesService from "./styles.service";
import { AuthToken } from "../database/models/authTokens.model";
import { Style } from "../database/models/style.model";

@Module({
  imports: [SequelizeModule.forFeature([Style, AuthToken])],
  providers: [CaslAbilityFactory, AuthGuardService, StylesService],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [StylesController],
})
export class StylesModule {}
