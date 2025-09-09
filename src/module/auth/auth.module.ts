import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthToken } from "../database/models/authTokens.model";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";

@Module({
  imports: [SequelizeModule.forFeature([User, AuthToken])],
  providers: [AuthService, AuthGuardService, CaslAbilityFactory],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [AuthController],
})
export class AuthModule {}
