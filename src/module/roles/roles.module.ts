import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Permission } from "../datebase/models/permission.model";
import { AuthToken } from "../datebase/models/authTokens.model";
import { User } from "../datebase/models/user.model";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { Role } from "../datebase/models/role.model";
import { RolePermission } from "../datebase/models/rolePermission.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Role,
      Permission,
      AuthToken,
      User,
      RolePermission,
    ]),
  ],
  providers: [CaslAbilityFactory, AuthGuardService, RolesService],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [RolesController],
})
export class RolesModule {}
