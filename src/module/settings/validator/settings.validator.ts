import { Injectable } from "@nestjs/common";
import Config from "../../config/config";
import { ValidatorInterface } from "./validator.interface";
import StringValidator from "./validators/string.validator";
import NumberValidator from "./validators/number.validator";
import BooleanValidator from "./validators/boolean.validator";
import DatetimeValidator from "./validators/datetime.validator";
import ArrayValidator from "./validators/array.validator";
import { ErrorInterface } from "./error.interface";

@Injectable()
export default class SettingsValidator {
  protected validators: Record<string, ValidatorInterface> = {};

  constructor(
    protected readonly config: Config,
    protected readonly stringValidator: StringValidator,
    protected readonly numberValidator: NumberValidator,
    protected readonly booleanValidator: BooleanValidator,
    protected readonly datetimeValidator: DatetimeValidator,
    protected readonly arrayValidator: ArrayValidator,
  ) {
    this.validators.string = stringValidator;
    this.validators.number = numberValidator;
    this.validators.boolean = booleanValidator;
    this.validators.datetime = datetimeValidator;
    this.validators.array = arrayValidator;
  }

  public validate(settings: Record<string, any>): ErrorInterface[] {
    const errors: ErrorInterface[] = [];
    Object.entries(settings).forEach(([index, value]) => {
      const error = this.getValidatorByType(index).validate(value, index);

      if (error) {
        errors.push(error);
      }
    });

    return errors;
  }

  protected getValidatorByType(name: string): ValidatorInterface {
    return (
      this.validators[this.config.getTypeByName(name)] ?? this.stringValidator
    );
  }
}
