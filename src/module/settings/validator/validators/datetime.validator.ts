import { ValidatorInterface } from "../validator.interface";
import { Injectable } from "@nestjs/common";
import { ErrorInterface } from "../error.interface";

@Injectable()
export default class DatetimeValidator implements ValidatorInterface {
  validate(value: any, key: string): ErrorInterface {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return { message: `Value for "${key}" is not a valid date` };
    }

    return null;
  }
}
