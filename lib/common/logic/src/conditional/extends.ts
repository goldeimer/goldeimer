/**
 * Conditional Type
 *
 * Resolves to one of two given types, depending on whether the subject type
 * extends the predicate type.
 *
 * Simply, `T extends PredicateT ? ThenT : ElseT` wrapped in a type, with
 * `ThenT` defaulting to `true` and `ElseT` to `false`. Utility type to
 * facilitate improved readability further down the line.
 *
 * @typeParam T - subject of the test, i.e. the type condition is evaluated for
 * @typeParam PredicateT - type which type `T` must extend for the condition to hold
 * @typeParam ThenT - type to resolve to on the condition having been met
 * @typeParam ElseT - type to resolve to on the condition not having held
 */
 export type Extends<
 T,
 PredicateT,
 ThenT = true,
 ElseT = false
> = T extends PredicateT ? ThenT : ElseT
