import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Setting } from "../database/models/setting.model";
import SettingsService from "./settings.service";
import SettingsController from "./settings.controller";
import { CaslAbilityFactory } from "../guards/permission/casl-ability.factory";
import { AuthToken } from "../database/models/authTokens.model";
import SettingsHelper from "./settings.helper";
import { AuthGuardService } from "../guards/auth/auth.guard.service";
import SettingsRepository from "./settings.repository";
import Config from "../config/config";
import SettingsValidator from "./validator/settings.validator";
import NumberValidator from "./validator/validators/number.validator";
import StringValidator from "./validator/validators/string.validator";
import BooleanValidator from "./validator/validators/boolean.validator";
import DatetimeValidator from "./validator/validators/datetime.validator";
import ArrayValidator from "./validator/validators/array.validator";

@Module({
  imports: [SequelizeModule.forFeature([Setting, AuthToken])],
  controllers: [SettingsController],
  providers: [
    SettingsService,
    AuthGuardService,
    CaslAbilityFactory,
    SettingsHelper,
    SettingsRepository,
    Config,
    SettingsValidator,
    NumberValidator,
    StringValidator,
    BooleanValidator,
    DatetimeValidator,
    ArrayValidator,
  ],
})
export default class SettingsModule {}
