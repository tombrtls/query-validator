import BaseTypeValidator from './BaseTypeValidator';

export default class IntegerValidator extends BaseTypeValidator<Number> {
  public convert(value: string): number {
    const number = Number(value)
    if (isNaN(number) && Number.isInteger(number) === false) {
      return undefined
    }

    return number
  }
}