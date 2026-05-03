import { Injectable } from "@nestjs/common";
import { Setting } from "../database/models/setting.model";
import TimeHelper from "./helpers/time.helper";
import ApiFacade from "../api/api.facade";

@Injectable()
export default class Config {
  loaded: number = 0;
  protected settings: Record<string, Setting> = {};

  constructor(
    protected readonly timeHelper: TimeHelper,
    protected readonly api: ApiFacade,
  ) {}

  public async onModuleInit(): Promise<void> {
    await this.loadSettings();
  }

  public async loadSettings(): Promise<void> {
    const settings = await this.api.settings.getSettings();
    const settingsMap: Record<string, Setting> = {};

    Object.entries(settings).forEach(([key, setting]) => {
      settingsMap[setting.key.toLowerCase()] = setting;
    });

    this.settings = settingsMap;
  }

  public get timeSectionPeriod(): number {
    const value = Number(this.settings["timesectionperiod"].value ?? 0);
    return typeof value === "number" ? value : 0;
  }

  public get startTimeTrainingSheet(): number {
    const timeString = String(
      this.settings["starttimetrainingsheet"].value ?? "0:00",
    );

    return this.timeHelper.timeStringToMinutes(timeString);
  }

  public get endTimeTrainingSheet(): number {
    const timeString = String(
      this.settings["endtimetrainingsheet"].value ?? "9:00",
    );

    return this.timeHelper.timeStringToMinutes(timeString);
  }

  public get dayOfWeekInTable(): string {
    return String(this.settings["dayofweekintable"].value ?? "1111100");
  }

  public getTypeByName(name: string): string {
    return this.settings[name].value_type ?? null;
  }
}
