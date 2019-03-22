import { IValidationResult } from "../ValidationResult"

export default interface IValidator<T, U> {
  validate(value?: T): IValidationResult<U>
}

export abstract class BaseValidator<T, U> {
  abstract validate(value?: T): IValidationResult<U>

  flatMap<V>(validator: BaseValidator<U, V>): BaseValidator<T, V> {
    return null
  } 
}
