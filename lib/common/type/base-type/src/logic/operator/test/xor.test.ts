import { staticAssertType } from '../../../util'

import type { Xor } from '../xor'

staticAssertType<Xor<true, false>>(true)
staticAssertType<Xor<false, true>>(true)

staticAssertType<Xor<true, true>>(false)
staticAssertType<Xor<false, false>>(false)

// @ts-expect-error
staticAssertType<Xor<true, false>>(false)
// @ts-expect-error
staticAssertType<Xor<false, true>>(false)

// @ts-expect-error
staticAssertType<Xor<true, true>>(true)
// @ts-expect-error
staticAssertType<Xor<false, false>>(true)
