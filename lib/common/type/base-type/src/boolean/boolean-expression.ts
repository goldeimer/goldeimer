import type { ToBoolean } from './boolean'
import type { ToNumber, ToString } from './boolean-like'
import type { Boolish } from './boolish'
import type { TruthValueEncoding as $Enc } from './truth-value-encoding'

export type ExpressionsOf<B extends Boolish> = [
    ToBoolean<B>,
    ToNumber<B>,
    ToString<B>
]

export type ExpressionOf<
    B extends Boolish,
    Encoding extends $Enc = $Enc.Default,
    Expressions extends [boolean, number, string] = ExpressionsOf<B>,
> = {
    [$Enc.Boolean]: Expressions[0],
    [$Enc.Number]: Expressions[1],
    [$Enc.NumericString]: `${Expressions[1]}`,
    [$Enc.HumanReadablePrimary]: Expressions[2],
    // TODO(Johannes):
    // Actually make translatable.
    // Not a priority at the time of commenting.
    [$Enc.HumanReadableI18nized]: Expressions[2]
}[Encoding]
