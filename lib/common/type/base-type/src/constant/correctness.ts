import type { Excessiveness } from './excessiveness'
import type { Exhaustiveness } from './exhaustiveness'

export type Correctness = {
    excessiveness: Excessiveness,
    exhaustiveness: Exhaustiveness
}

export type DefaultCorrectness = {
    excessiveness: Excessiveness.NoExtraneousEntries,
    exhaustiveness: Exhaustiveness.FallbackToDefault
}
