import { Injectable } from "@nestjs/common";
import { Setting } from "../../database/models/setting.model";
import ApiFacade from "../../api/api.facade";

@Injectable()
export default class SettingsLoader {
  constructor(protected readonly api: ApiFacade) {}

  async loadSettings(): Promise<Record<string, Setting>> {
    const settings = await this.api.settings.getSettings();
    const settingsMap: Record<string, Setting> = {};

    Object.entries(settings).forEach(([key, setting]) => {
      settingsMap[setting.key.toLowerCase()] = setting;
    });

    return settingsMap;
  }
}
