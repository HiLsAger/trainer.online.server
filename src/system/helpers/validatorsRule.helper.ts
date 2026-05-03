export default class ValidatorsRuleHelper {
  public static isScheduleStringValid(schedule: string): boolean {
    const regex = /^[01]{7}$/;

    return regex.test(schedule);
  }
}
