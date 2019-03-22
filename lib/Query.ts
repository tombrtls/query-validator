'use strict'

import { IValidationResult, combine2, combine3 } from './ValidationResult'
import IValidator from './validators/IValidator';

export default class Query {
	constructor(private query: any) {}

	shouldContain<T>(validator: IValidator<T>): IValidationResult<T> {
		return validator.validate(this.query)
	}

	shouldContain2<T1, T2>(validator1: IValidator<T1>, validator2: IValidator<T2>): IValidationResult<[ T1, T2 ]> {
		return combine2(
			validator1.validate(this.query), 
			validator2.validate(this.query)
		)
	}

	shouldContain3<T1, T2, T3>(validator1: IValidator<T1>, validator2: IValidator<T2>, validator3: IValidator<T3>): IValidationResult<[ T1, T2, T3 ]> {
		return combine3(
			validator1.validate(this.query),
			validator2.validate(this.query),
			validator3.validate(this.query)
		)
	}

	private combineTupleResults<T1, T2, T3>(result1: IValidationResult<[T1, T2]>, result2: IValidationResult<T3>): IValidationResult<[T1, T2, T3]> {
		return result1.combine(result2)
			.map(([arg1And2, arg3]) => {
				const [arg1, arg2] = arg1And2
				return [arg1, arg2, arg3] as [T1, T2, T3]
			})
	}

}

