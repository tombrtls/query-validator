import BaseTypeValidator from './BaseTypeValidator'

export default class StringValidator extends BaseTypeValidator<string> {
  convert(value: string): string {
    return value
  }
}
