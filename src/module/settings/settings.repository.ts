import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Setting } from "../database/models/setting.model";
import Config from "../config/config";
import SettingsValidator from "./validator/settings.validator";

@Injectable()
export default class SettingsRepository {
  constructor(
    @InjectModel(Setting) protected readonly settingModel: Setting,
    protected readonly config: Config,
    protected readonly validator: SettingsValidator,
  ) {}

  public async save(settings: Record<string, any>): Promise<void> {
    const transaction = await this.settingModel.sequelize.transaction();

    try {
      for (const [key, value] of Object.entries(settings)) {
        await this.settingModel.update(
          { value: value },
          { where: { key: key } },
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
