import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { UsersModule } from "./users/users.module";
import { FieldsModule } from "./fields/fields.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "./roles/roles.module";
import { TrainingsModule } from "./trainings/trainings.module";
import { StylesModule } from "./styles/styles.module";
import ApiModule from "./api/api.module";
import TrainingRoomsModule from "./trainingRooms/trainingRooms.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ProfileModule,
    UsersModule,
    FieldsModule,
    PermissionsModule,
    RolesModule,
    TrainingsModule,
    StylesModule,
    ApiModule,
    TrainingsModule,
    TrainingRoomsModule,
  ],
})
export class ModuleModules {}
