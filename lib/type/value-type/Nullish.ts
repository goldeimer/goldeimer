import { MultiHandler } from '@goldeimer/utility-types'

export type SetNullish<T> = MultiHandler<SetNullish<T>, T>
