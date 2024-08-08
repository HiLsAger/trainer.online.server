import { Module } from '@nestjs/common';
import { DatebaseModule } from './datebase/datebase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatebaseModule, AuthModule],
})
export class ModuleModules {}
