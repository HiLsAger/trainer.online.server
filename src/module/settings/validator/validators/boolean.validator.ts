import { ValidatorInterface } from "../validator.interface";
import { Injectable } from "@nestjs/common";
import { ErrorInterface } from "../error.interface";

@Injectable()
export default class BooleanValidator implements ValidatorInterface {
  public validate(value: any, key: string = null): ErrorInterface {
    return typeof value === "boolean"
      ? null
      : { message: `${key} is not boolean` };
  }
}
