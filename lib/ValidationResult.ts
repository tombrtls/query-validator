'use strict'

export interface IValidationPattern<T, U> {
  Success: (result: T) => U,
  Failure: (error: string) => U
}

export interface IValidationResult<T> {
  isValid: boolean

  match<U>(validationPattern: IValidationPattern<T, U>): U
  combine<U>(validation: IValidationResult<U>): IValidationResult<[T, U]>
  map<U>(func: (input: T) => U): IValidationResult<U>
  flatMap<U>(func: (input: T) => IValidationResult<U>): IValidationResult<U>
}


export class ValidationSuccess<T> implements IValidationResult<T> {
  public isValid: boolean = true
  public result: T

  constructor(result: T) {
    this.result = result
  }

  public match<U>(validationPattern: IValidationPattern<T, U>): U {
    return validationPattern.Success(this.result)
  }

  public combine<U>(otherValidation: IValidationResult<U>): IValidationResult<[T, U]> {
    return otherValidation.match<IValidationResult<[T, U]>>({
      Success: (result) => new ValidationSuccess<[T, U]>([this.result, result]),
      Failure: (error) => new ValidationFailure<[T, U]>(error)
    })
  }

  public map<U>(func: (input: T) => U): IValidationResult<U> {
    return new ValidationSuccess(func(this.result))
  }

  public flatMap<U>(func: (input: T) => IValidationResult<U>): IValidationResult<U> {
    return func(this.result)
  }
}

// tslint:disable-next-line:max-classes-per-file
export class ValidationFailure<T> implements IValidationResult<T> {
  public isValid: boolean = false
  public error: string

  constructor(error: string | string[]) {
    if (Array.isArray(error)) {
      this.error = error.join(', ')
    } else {
      this.error = error
    }
  }

  public match<U>(validationPattern: IValidationPattern<T, U>): U {
    return validationPattern.Failure(this.error)
  }

  public combine<U>(otherValidation: IValidationResult<U>): IValidationResult<[T, U]> {
    return otherValidation.match({
      Success: (_) => new ValidationFailure<[T, U]>(this.error),
      Failure: (error) => new ValidationFailure<[T, U]>([this.error, error])
    })
  }

  public map<U>(func: (input: T) => U): IValidationResult<U> {
    return new ValidationFailure(this.error)
  }

  public flatMap<U>(func: (input: T) => IValidationResult<U>): IValidationResult<U> {
    return new ValidationFailure(this.error)
  }
}

export function combine1<T>(validation: IValidationResult<T>): IValidationResult<T> {
  return validation
}

export function combine2<T1, T2>(vali1: IValidationResult<T1>, vali2: IValidationResult<T2>): IValidationResult<[T1, T2]> {
  return vali1.combine(vali2)
}

export function combine3<T1, T2, T3>(vali1: IValidationResult<T1>, vali2: IValidationResult<T2>, vali3: IValidationResult<T3>): IValidationResult<[T1, T2, T3]> {
  const validation = combine2(vali1, vali2).combine(vali3)

  return validation.match<IValidationResult<[T1, T2, T3]>>({
    Success: ([[arg1, arg2], arg3]) => {
      return new ValidationSuccess<[T1, T2, T3]>([ arg1, arg2, arg3 ])
    },
    Failure: (error) => {
      return new ValidationFailure(error)
    }
  })
}

export function combine4<T1, T2, T3, T4>(vali1: IValidationResult<T1>, vali2: IValidationResult<T2>, vali3: IValidationResult<T3>, vali4: IValidationResult<T4>): IValidationResult<[T1, T2, T3, T4]> {
  const validation = combine3(vali1, vali2, vali3).combine(vali4)

  return validation.match<IValidationResult<[T1, T2, T3, T4]>>({
    Success: ([[arg1, arg2, arg3], arg4]) => {
      return new ValidationSuccess<[T1, T2, T3, T4]>([ arg1, arg2, arg3, arg4])
    },
    Failure: (error) => {
      return new ValidationFailure(error)
    }
  })
}

export function combine5<T1, T2, T3, T4, T5>(vali1: IValidationResult<T1>, vali2: IValidationResult<T2>, vali3: IValidationResult<T3>, vali4: IValidationResult<T4>, vali5: IValidationResult<T5>): IValidationResult<[T1, T2, T3, T4, T5]> {
  const validation = combine4(vali1, vali2, vali3, vali4).combine(vali5)
  return validation.match<IValidationResult<[T1, T2, T3, T4, T5]>>({
    Success: ([[arg1, arg2, arg3, arg4], arg5]) => {
      return new ValidationSuccess<[T1, T2, T3, T4, T5]>([ arg1, arg2, arg3, arg4, arg5 ])
    },
    Failure: (error) => {
      return new ValidationFailure(error)
    }
  })
}
