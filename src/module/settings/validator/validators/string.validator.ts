import { ValidatorInterface } from "../validator.interface";
import { Injectable } from "@nestjs/common";
import { ErrorInterface } from "../error.interface";

@Injectable()
export default class StringValidator implements ValidatorInterface {
  errors: ErrorInterface[] = [];

  validate(value: any, key: string = null): ErrorInterface {
    return typeof value === "string"
      ? null
      : { message: `${key} is not a string` };
  }
}
