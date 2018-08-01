
import parameter, * as validator from '../lib'
import { IValidationPattern, IValidationResult } from '../lib/ValidationResult';
import NumberValidator from '../lib/validators/NumberValidator';
import IValidator from '../lib/validators/IValidator';

describe('validation', () => {
  describe('shouldBeANumber', () => {
    test('should return a NumberValidator with a minimumValue and maximumValue value', () => {
      const numberValidator = validator.shouldBeANumber()
        .between(20).and(50)

      expect(numberValidator.minimumValue).toEqual(20)
      expect(numberValidator.maximumValue).toEqual(50)
    })

    test('should return a NumberValidator with the minimumValue and maximumValue value switched if the between values are flipped', () => {
      const numberValidator = validator.shouldBeANumber()
        .between(50).and(20)

      expect(numberValidator.minimumValue).toEqual(20)
      expect(numberValidator.maximumValue).toEqual(50)
    })

    test('should return a NumberValdiator with a minimumValue value specified in "biggerThan"', () => {
      const numberValidator = validator.shouldBeANumber()
        .biggerThan(20)

      expect(numberValidator.minimumValue).toEqual(21)
      expect(numberValidator.maximumValue).toBeUndefined
    })

    test('should return a NumberValdiator with a minimumValue value specified in "biggerOrEqualTo"', () => {
      const numberValidator = validator.shouldBeANumber()
        .biggerThanOrEqualTo(20)

      expect(numberValidator.minimumValue).toEqual(20)
      expect(numberValidator.maximumValue).toBeUndefined
    })

    test('should return a NumberValdiator with a maximumValue value specified in "smallerThan"', () => {
      const numberValidator = validator.shouldBeANumber()
        .smallerThan(20)

      expect(numberValidator.minimumValue).toBeUndefined
      expect(numberValidator.maximumValue).toEqual(19)
    })

    test('should return a NumberValdiator with a maximumValue value specified in "smallerOrEqualTo"', () => {
      const numberValidator = validator.shouldBeANumber()
        .smallerThanOrEqualTo(20)

      expect(numberValidator.minimumValue).toBeUndefined
      expect(numberValidator.maximumValue).toEqual(20)
    })

    test('should return a NumberValdiator with a default value specified in "ifUndefinedReturn"', () => {
      const numberValidator = validator.shouldBeANumber()
        .ifUndefinedReturn(20)

      expect(numberValidator.minimumValue).toBeUndefined
      expect(numberValidator.maximumValue).toBeUndefined
      expect(numberValidator.defaultValue).toEqual(20)
    })
  })

  test('should be able to create a number validator with a maximum, minimum and default value', () =>{
    const numberValidator: NumberValidator = parameter('limit').shouldBeANumber()
      .greaterThan(20).and.smallerThan(50).and.ifUndefinedUse(25)
    expect(numberValidator.minimumValue).toEqual(21)
    expect(numberValidator.maximumValue).toEqual(49)
    expect(numberValidator.defaultValue).toEqual(25)

    const valueToLowResult: IValidationResult<number> = numberValidator.validate('20')
    expect(valueToLowResult.isValid).toBe(false)

    const valueToHighResult: IValidationResult<number> = numberValidator.validate('50')
    expect(valueToHighResult.isValid).toBe(false)

    const useInputValue: IValidationResult<number> = numberValidator.validate('21')
    expect(useInputValue.isValid).toBe(true)
    useInputValue.match<void>({
      Success: (result) => expect(result).toEqual(21),
      Failure: (err) => {}
    })

    const useFallbackValueResult: IValidationResult<number> = numberValidator.validate()
    expect(useFallbackValueResult.isValid).toBe(true)
    useFallbackValueResult.match<void>({
      Success: (result) => expect(result).toEqual(25),
      Failure: (err) => {}
    })
  })

  test('', () => {
    const query = {
      limit: '5',
      offset: '10'
    }
    const validationResult: IValidationResult<[number, number]> = query(query).shouldHave(
      paramater('limit').shouldBeAnInteger().greaterThan(0).and.smallerThan(50)
      parameter('offset').shouldBeAnInteger().greaterThan(0).and.smallerThan(50)
    )

    expect(validationResult.isValid).toBe(true)
    validationResult.match({
      Success: ([limit, offset]) => {
        expect(limit).toEqual(5)
        expect(offset).toEqual(10)
      },
      Failure: (err) => { throw new Error(err) }
    })

    const valdiator: IValidator<[number, number]> = query().willHave(
      paramater('limit').shouldBeAnInteger().greaterThan(0).and.smallerThan(50)
      parameter('offset').shouldBeAnInteger().greaterThan(0).and.smallerThan(50)
    )

  })
})
