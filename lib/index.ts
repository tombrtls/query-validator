import NumberValidator from './validators/NumberValidator'

export function shouldBeANumber(): NumberValidator {
  return new NumberValidator()
}
