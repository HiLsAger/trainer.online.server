import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { AuthToken } from "../database/models/authTokens.model";
import { UsersService } from "./users.service";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { UsersController } from "./users.controller";

@Module({
  imports: [SequelizeModule.forFeature([User, AuthToken])],
  providers: [UsersService, AuthGuardService, CaslAbilityFactory],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [UsersController],
})
export class UsersModule {}
