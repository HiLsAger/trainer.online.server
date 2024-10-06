import { Module } from "@nestjs/common";
import { DatebaseModule } from "./datebase/datebase.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [DatebaseModule, AuthModule, ProfileModule, UsersModule],
})
export class ModuleModules {}
