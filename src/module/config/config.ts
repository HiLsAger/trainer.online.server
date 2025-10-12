import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ApiFacade from "../api/api.facade";
import { Setting } from "../database/models/setting.model";

@Injectable()
export default class Config {
  protected settings: Record<string, Setting> = {};

  constructor(
    @Inject(forwardRef(() => ApiFacade)) protected readonly api: ApiFacade,
  ) {}

  public async onModuleInit(): Promise<void> {
    const settings = await this.api.settings.getSettings();

    Object.entries(settings).forEach(([key, setting]) => {
      this.settings[setting.key.toLowerCase()] = setting;
    });
  }

  public get timeSectionPeriod(): number {
    const value = Number(this.settings["timeSectionPeriod"].value ?? 0);
    return typeof value === "number" ? value : 0;
  }

  public getTypeByName(name: string): string {
    return this.settings[name].value_type ?? null;
  }
}
