import { ValidatorInterface } from "../validator.interface";
import { Injectable } from "@nestjs/common";
import { ErrorInterface } from "../error.interface";

@Injectable()
export default class ArrayValidator implements ValidatorInterface {
  validate(value: any, key: string = null): ErrorInterface {
    return null;
  }
}
