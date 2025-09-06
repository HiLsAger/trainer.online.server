import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import { User } from "../datebase/models/user.model";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { AuthToken } from "../datebase/models/authTokens.model";
import PermissionService from "../guards/permission/permission.service";
import { FieldsController } from "./fields.controller";
import { FieldsService } from "./fields.service";
import { Role } from "../datebase/models/role.model";
import { Permission } from "../datebase/models/permission.model";

@Module({
  imports: [SequelizeModule.forFeature([User, AuthToken, Role, Permission])],
  providers: [
    FieldsService,
    AuthGuardService,
    CaslAbilityFactory,
    PermissionService,
  ],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [FieldsController],
})
export class FieldsModule {}
