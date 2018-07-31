import BaseValidator from '../BaseValidator'
import { IValidationResult, ValidationFailure, ValidationSuccess } from '../ValidationResult';

export default class NumberValidator extends BaseValidator<number> {

  public minimumValue?: number
  public maximumValue?: number

  public validate(value?: string): IValidationResult<number> {
    if (!value) {
      return new ValidationFailure(`Value is undefined`)
    }

    const number = Number(value)
    if (isNaN(number)) {
      return new ValidationFailure(`Value '${value}' cannot be converted to a number`)
    }

    if (this.minimumValue && this.maximumValue) {
      if (number < this.minimumValue || number > this.maximumValue) {
        return new ValidationFailure([`${number} not between ${this.minimumValue} and ${this.maximumValue}`])
      }
    }

    return new ValidationSuccess(number)
  }

  public between(firstValue: number) {
    this.minimumValue = firstValue

    return {
      and: (secondValue: number): NumberValidator => {
        if (firstValue < secondValue) {
          this.maximumValue = firstValue
          this.maximumValue = secondValue
        } else if (secondValue < firstValue) {
          this.minimumValue = secondValue
          this.maximumValue = firstValue
        } else {
          this.minimumValue = firstValue
          this.maximumValue = firstValue
        }

        return this
      }
    }
  }

  public biggerThan(num: number): NumberValidator {
    return this.biggerThanOrEqualTo(num + 1)
  }

  public biggerThanOrEqualTo(num: number): NumberValidator {
    this.minimumValue = num    
    return this
  }

  public smallerThan(num: number): NumberValidator {
    return this.smallerThanOrEqualTo(num - 1)
  }

  public smallerThanOrEqualTo(num: number): NumberValidator {
    this.maximumValue = num    
    return this
  }
}
