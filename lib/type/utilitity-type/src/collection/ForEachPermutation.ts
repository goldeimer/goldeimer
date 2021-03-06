import { Callable, CallFn } from './function'
import { ForEach } from './ForEach'
import { MaybeCollection } from './MaybeCollection'

export interface ForEachPermutation<
    FnType extends Callable,
    Argument = Array<Argument>,
    MaybeCollectionA = MaybeCollection<TypeA>,
    MaybeCollectionB = MaybeCollection<TypeB>
> (
    fn: FnType,
    args: Array<Argument> = [],
    MaybeCollectionA = unknown,
    MaybeCollectionB = unknown
): (
    ForEach<
        MaybeCollectionA,
        ForEach<
            MaybeCollectionB,
            CallFn<fn, args>
        >
    >
)
