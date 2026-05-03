import { ValidatorInterface } from "../validator.interface";
import { Injectable } from "@nestjs/common";
import { ErrorInterface } from "../error.interface";
import ValidatorsRuleHelper from "../../../../system/helpers/validatorsRule.helper";

@Injectable()
export default class ScheduleValidator implements ValidatorInterface {
  errors: ErrorInterface[] = [];

  validate(value: any, key: string = null): ErrorInterface {
    return ValidatorsRuleHelper.isScheduleStringValid(value)
      ? null
      : { message: `${key} is not a string` };
  }
}
