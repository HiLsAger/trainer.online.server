import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Setting } from "../database/models/setting.model";
import ApiFacade from "../api/api.facade";
import SettingsHelper from "./settings.helper";
import Form from "../../packages/forms/interfaces/form.interface";
import SettingsRepository from "./settings.repository";
import SettingsValidator from "./validator/settings.validator";

@Injectable()
export default class SettingsService {
  constructor(
    @InjectModel(Setting) protected readonly settingsModel: typeof Setting,
    protected readonly api: ApiFacade,
    protected readonly settingsHelper: SettingsHelper,
    protected readonly repository: SettingsRepository,
    protected readonly validator: SettingsValidator,
  ) {}

  public async getGroups(): Promise<Record<string, string>> {
    return await this.api.settings.getGroups();
  }

  public async getSettingsByGroup(group: string): Promise<Form> {
    const settings = await this.api.settings.getSettingsByGroup(group);

    return this.settingsHelper.prepareToForm(settings, group);
  }

  public async setSettings(settings: Record<string, string>): Promise<string> {
    const errors = this.validator.validate(settings);

    if (errors && errors.length > 0) {
      throw new BadRequestException({
        message: "Ошибка валидации данных",
        errors: errors,
      });
    }

    await this.repository.save(settings);

    return "success";
  }
}
