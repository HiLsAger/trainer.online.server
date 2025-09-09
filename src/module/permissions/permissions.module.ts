import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Permission } from "../database/models/permission.model";
import { AuthToken } from "../database/models/authTokens.model";
import { User } from "../database/models/user.model";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { PermissionsController } from "./permissions.controller";
import { PermissionsService } from "./permissions.service";

@Module({
  imports: [SequelizeModule.forFeature([Permission, AuthToken, User])],
  providers: [CaslAbilityFactory, AuthGuardService, PermissionsService],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
