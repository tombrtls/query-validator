import NumberValidator from './validators/NumberValidator'
import IntegerValidator from './validators/IntegerValidator'
import StringValidator from './validators/StringValidator'

export class Parameter {
  constructor(private name: string) {}

  shouldBeANumber(): NumberValidator {
    return new NumberValidator()
  }

  shouldBeAnInteger(): IntegerValidator {
    return new IntegerValidator()
  }

  shouldbeAString(): StringValidator {
    return new StringValidator()
  }
}

export default function parameter(name: string): Parameter {
  return new Parameter(name)
}
