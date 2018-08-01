import IValidator from "./IValidator"
import { IValidationResult, ValidationFailure, ValidationSuccess } from '../ValidationResult'

export default abstract class BaseTypeValidator<T> implements IValidator<string, T> {
  validate(value?: string): IValidationResult<T> {
    if (!value) {
      return new ValidationFailure('Value is undefined')
    }

    const convertedValue = this.convert(value)
    if (convertedValue) {
      return new ValidationSuccess(convertedValue)
    } else {
      return new ValidationFailure(`Unable to convert ${value}`)
    }
  }

  abstract convert(value: string): T | undefined
}