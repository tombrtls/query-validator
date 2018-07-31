import { IValidationResult } from "./ValidationResult"

export default abstract class BaseValidator<T> {

  /**
   * Determines whether the Validator should return a `ValidationFailure` if the 
   * input value is undefined.
   */
  isOptional: boolean = false

  /**
   * If specified the `defaultValue` will be used whenever the input value is undefined.
   * If the `defaultValue` is not specified, the `isOptional` will determine what the validator will do.
   */
  defaultValue?: T

  /**
   * Will process and validate the value.
   * @param value {string} The input value
   */
  abstract validate(value?: string): IValidationResult<T>
}
