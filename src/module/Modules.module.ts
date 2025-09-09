import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { UsersModule } from "./users/users.module";
import { FieldsModule } from "./fields/fields.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ProfileModule,
    UsersModule,
    FieldsModule,
    PermissionsModule,
    RolesModule,
  ],
})
export class ModuleModules {}
