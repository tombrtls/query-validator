'use strict'

import { ValidationSuccess, ValidationFailure, combine2, combine3, combine4, combine5, combine1, IValidationResult } from '../lib/ValidationResult';
import * as _ from 'lodash'

describe('ValidationResults', () => {
  
  test('should have a result if it is a ValidationSucces', () => {
    const validationResult = new ValidationSuccess(true)
    expect(validationResult.isValid).toEqual(true)
    expect(validationResult.result).toBeDefined
    expect(validationResult.result).toEqual(true)
  })

  test('should have a result if it is a ValidationFailure', () => {
    const error = 'Error message'
    const validationResult = new ValidationFailure(error)
    expect(validationResult.isValid).toEqual(false)
    expect(validationResult.error).toBeDefined
    expect(validationResult.error).toEqual(error)
  })

  describe('combine', () => {
    test('should combine the results if both the validations are succesful', () => {
      const validation1 = new ValidationSuccess(1)
      const validation2 = new ValidationSuccess('Test')
      const combined = validation1.combine(validation2)
      expect(combined.isValid).toEqual(true)
      combined.match({
        Success: (result) => expect(result).toEqual([1, 'Test']),
        Failure: (err) => { throw new Error(`Should have succeeded, but failed with '${err}'`) }
      })
    })

    test('should fallback to the error if one of the two validations are failures', () => {
      const error = 'Error message'
      const validation1 = new ValidationFailure(error)
      const validation2 = new ValidationSuccess('Test')
      const combined = validation1.combine(validation2)
      expect(combined.isValid).toEqual(false)
      combined.match({
        Success: () => { throw new Error("Match should have failed") },
        Failure: (err) => expect(err).toEqual(error)
      })
    })

    test('should combine the errors if both the validations are failures', () => {
      const error1 = 'Error message'
      const validation1 = new ValidationFailure(error1)

      const error2 = 'Error message 2'
      const validation2 = new ValidationFailure(error2)
      const combined = validation1.combine(validation2)
      expect(combined.isValid).toEqual(false)
      combined.match({
        Success: () => { throw new Error("Match should have failed") },
        Failure: (err) => expect(err).toEqual([error1, error2].join(', '))
      })
    })
  })

  describe('combine', () => {
    test('should return the input when flatten is called with a single OValidationResult', () => {
      const validation = new ValidationSuccess(true)
      expect(combine1(validation)).toBe(validation)
    })

    const flattenFunctions: any[] = [combine2, combine3, combine4, combine5]
    flattenFunctions
      .forEach((flattenFunc, index) => {
        test(`should flatten the ${index + 2} results if all of the validations are ValidationSuccess`, () => {
            const numberOfValidations = index + 2
            const validationIndices = _.range(0, numberOfValidations)
            const validations = validationIndices
              .map((validationIndex) => new ValidationSuccess(validationIndex))

            const flattenedValidation = flattenFunc(...validations)
            expect(flattenedValidation.isValid).toBe(true)
            expect(flattenedValidation.result).toBeDefined
            expect(flattenedValidation.result).toEqual(validationIndices)
            expect(flattenedValidation.error).toBeUndefined
        })
      })

      flattenFunctions
      .forEach((flattenFunc, index) => {
        test(`should flatten the ${index + 2} errors if all of the validations are ValidationFailure`, () => {
          const numberOfValidations = index + 2
          const validationIndices = _.range(0, numberOfValidations)
          const validationErrors = validationIndices
            .map((validationIndex) => `Failure ${validationIndex}`)

          const validations = validationErrors
            .map((error) => new ValidationFailure(error))

          const flattenedValidation = flattenFunc(...validations)
          expect(flattenedValidation.isValid).toBe(false)
          expect(flattenedValidation.result).toBeUndefined
          expect(flattenedValidation.error).toBeDefined
          expect(flattenedValidation.error).toEqual(validationErrors.join(', '))
        })
      })

      flattenFunctions
      .forEach((flattenFunc, index) => {
        test(`should flatten into an ValidationFailure if 1 out of ${index + 2} validation is a ValidationFailure`, () => {
          const numberOfValidations = index + 1
          const validationIndices = _.range(0, numberOfValidations)
          const validations: Array<IValidationResult<number>> = validationIndices
            .map((validationIndex) => new ValidationSuccess(validationIndex))

          const errorMessage = 'error message'
          validations.push(new ValidationFailure(errorMessage))

          const flattenedValidation = flattenFunc(...validations)
          expect(flattenedValidation.isValid).toBe(false)
          expect(flattenedValidation.result).toBeUndefined
          expect(flattenedValidation.error).toBeDefined
          expect(flattenedValidation.error).toEqual(errorMessage)
        })
      })
  })
})
