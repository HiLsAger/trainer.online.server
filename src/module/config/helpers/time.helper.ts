import { Injectable } from "@nestjs/common";

@Injectable()
export default class TimeHelper {
  public timeStringToMinutes(timeString: string): number {
    const [hours, minutes] = timeString
      .split(":")
      .map((part) => parseInt(part, 10) || 0);

    return hours * 60 + minutes;
  }
}
