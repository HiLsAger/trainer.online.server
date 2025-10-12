import { ValidatorInterface } from "../validator.interface";
import { Injectable } from "@nestjs/common";
import { ErrorInterface } from "../error.interface";

@Injectable()
export default class NumberValidator implements ValidatorInterface {
  public validate(value: any, key: string): ErrorInterface {
    value = Number(value);

    if (!isNaN(value)) {
      return null;
    }

    return { message: `Value ${key} is not a number` };
  }
}
