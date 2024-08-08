import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../datebase/models/user.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthTocken } from '../datebase/models/authTokens.model';
import { AuthGuardService } from '../guards/services/auth.guard.service';
import { CaslAbilityFactory } from '../guards/permission/casl-ability.factory';

@Module({
  imports: [SequelizeModule.forFeature([User, AuthTocken])],
  providers: [AuthService, AuthGuardService, CaslAbilityFactory],
  exports: [AuthGuardService, CaslAbilityFactory],
  controllers: [AuthController],
})
export class AuthModule {}
