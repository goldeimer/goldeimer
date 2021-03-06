import { StrongType } from '@goldeimer/utility-types'

export type ValueType<Type> = StrongType<Type>
// export type ValueTypeWithValidation<Type> = WithValidation<ValueType<Type>>

export type Email = ValueType<string>
export type Path = ValueType<string>
export type Url = ValueType<string>
