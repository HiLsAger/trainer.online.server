export default class ApiAbstract {
  protected arrayMap(
    data: object[],
    index: string,
    value: string,
  ): Record<string, string> {
    const result: Record<string, string> = {};

    data.forEach((item: Record<string, any>) => {
      result[item[index]] = item[value];
    });

    return result;
  }
}
