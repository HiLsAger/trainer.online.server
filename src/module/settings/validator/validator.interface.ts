import { ErrorInterface } from "./error.interface";

export interface ValidatorInterface {
  validate(value: any, key: string): ErrorInterface;
}
