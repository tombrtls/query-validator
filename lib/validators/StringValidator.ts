import BaseValidator from '../BaseValidator'
import { IValidationResult, ValidationFailure, ValidationSuccess } from '../ValidationResult';

export default class StringValidator extends BaseValidator<string> {
  public validate(value?: string): IValidationResult<string> {
    if (!value) {
      return new ValidationFailure(`Value is undefined`)
    }

    return new ValidationSuccess(value)
  }
}
