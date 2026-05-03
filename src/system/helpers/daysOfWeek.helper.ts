import { DaysOfWeekInterface } from "../interfaces/daysOfWeek.interface";
import ValidatorsRuleHelper from "./validatorsRule.helper";

export default class DaysOfWeekHelper {
  public static prepareDayOfWeek(daysOfWeek: string): DaysOfWeekInterface | null {
    if (!ValidatorsRuleHelper.isScheduleStringValid(daysOfWeek)) {
      return null;
    }

    const daysOrder: Array<keyof DaysOfWeekInterface> = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const result: DaysOfWeekInterface = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };

    for (let i = 0; i < daysOfWeek.length; i++) {
      const dayKey = daysOrder[i];
      result[dayKey] = daysOfWeek[i] === "1";
    }

    return result;
  }
}
