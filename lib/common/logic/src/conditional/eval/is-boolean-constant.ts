import type { Falses, Trues } from '../../boolean'

import type { Extends } from '../extends'

 /**
  * Boolean Type
  *
  * Determines whether `T` is a "false" evaluated condition
  * (the `False` type or a tuple thereof).
  * Resolves to either `true` or `false`.
  *
  * {@inheritDoc DOC.TYPE_PARAM.CONDITION_SUBJECT}
  */
export type IsFalse<T> = Extends<T, Falses>

 /**
  * Boolean Type
  *
  * Determines whether `T` is a "true" evaluated condition
  * (the `True` type or a tuple thereof).
  * Resolves to either `true` or `false`.
  *
  * {@inheritDoc DOC.TYPE_PARAM.CONDITION_SUBJECT}
  */
export type IsTrue<T> = Extends<T, Trues>
