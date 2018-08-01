import { BaseValidator } from './IValidator'
import { IValidationResult } from '../ValidationResult';

export default class AggregateValidator<T, U, V> extends BaseValidator<T, V> {
  constructor(private parentValidator: BaseValidator<T, U>, private childValidator: BaseValidator<U, V>) { 
    super()
  }
  
  validate(value: T): IValidationResult<V> {
    return this.parentValidator.validate(value)
      .flatMap(() => this.childValidator)
  }
}