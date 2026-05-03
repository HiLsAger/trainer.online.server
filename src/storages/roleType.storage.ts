export default class RoleTypeStorage {
  public static TYPE_LIST: Record<number, string> = {
    0: "Без роли",
    1: "Тренер",
    2: "Менеджер",
  };

  public static RoleTypes = {
    none: 0,
    trainer: 1,
    manager: 2,
  };

  public static getTypeNameByCode(code: number): string {
    return this.TYPE_LIST[code] ?? "";
  }
}
