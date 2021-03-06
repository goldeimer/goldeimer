import {
    MaybeCollection
} from '@goldeimer/collection'

import {
    AnyFn
} from '@goldeimer/types'

import {
    Callable
} from '@goldeimer/traits'

class CallFn<
    FnType extends Callable = AnyFn,
    ArgumentType = MaybeCollection<unknown>
> {(
    fn: FnType = [],
    ...args: ArgumentType = []
) => {
    return fn(...args, ArgumentType) => value
}
