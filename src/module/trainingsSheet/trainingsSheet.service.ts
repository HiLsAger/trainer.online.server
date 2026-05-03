import { Injectable } from "@nestjs/common";
import Config from "../config/config";
import ApiFacade from "../api/api.facade";
import DaysOfWeekHelper from "../../system/helpers/daysOfWeek.helper";

@Injectable()
export default class TrainingsSheetService {
  constructor(
    protected readonly api: ApiFacade,
    protected readonly config: Config,
  ) {}

  public getTableSettings(): Record<string, any> {
    return {
      timeSectionPeriod: this.config.timeSectionPeriod,
      startTimeTrainingSheet: this.config.startTimeTrainingSheet,
      endTimeTrainingSheet: this.config.endTimeTrainingSheet,
      dayOfWeekInTable: DaysOfWeekHelper.prepareDayOfWeek(
        this.config.dayOfWeekInTable,
      ),
    };
  }
}
