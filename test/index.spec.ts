
import * as validator from '../lib'

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
  })
})
