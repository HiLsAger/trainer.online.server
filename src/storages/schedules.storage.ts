export default class SchedulesStorage {
  public static readonly MONDAY = 1;
  public static readonly TUESDAY = 2;
  public static readonly WEDNESDAY = 3;
  public static readonly THURSDAY = 4;
  public static readonly FRIDAY = 5;
  public static readonly SATURDAY = 6;
  public static readonly SUNDAY = 7;

  public static readonly daysOfWeek = {
    1: "Понедельник",
    2: "вторник",
    3: "среда",
    4: "четверг",
    5: "пятница",
    6: "суббота",
    7: "воскресенье",
  };
}
