import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProfileService } from "./profile.service";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import { User } from "../datebase/models/user.model";
import { ProfileController } from "./profile.controller";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { AuthToken } from "../datebase/models/authTokens.model";
import PermissionService from "../guards/permission/permission.service";

@Module({
  imports: [SequelizeModule.forFeature([User, AuthToken])],
  providers: [
    ProfileService,
    AuthGuardService,
    CaslAbilityFactory,
    PermissionService,
  ],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [ProfileController],
})
export class ProfileModule {}
