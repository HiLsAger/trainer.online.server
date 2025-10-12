import ApiAbstract from "../api.abstract";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ApiFacade from "../api.facade";
import { InjectModel } from "@nestjs/sequelize";
import { Setting } from "../../database/models/setting.model";
import Config from "../../config/config";

@Injectable()
export default class SettingsApi extends ApiAbstract {
  constructor(
    @Inject(forwardRef(() => ApiFacade)) protected readonly api: ApiFacade,
    @Inject(forwardRef(() => Config)) protected readonly config: Config,
    @InjectModel(Setting) protected readonly settingModel: typeof Setting,
  ) {
    super();
  }

  public async getGroups(): Promise<Record<string, string>> {
    return await this.settingModel
      .findAll({
        attributes: ["group"],
        group: ["group"],
      })
      .then((settings) => this.arrayMap(settings, "group", "group"));
  }

  public async getSettingsByGroup(group: string): Promise<Setting[]> {
    return await this.settingModel.findAll({
      where: { group: group },
    });
  }

  public async getSettings(): Promise<Setting[]> {
    return await this.settingModel.findAll();
  }
}
