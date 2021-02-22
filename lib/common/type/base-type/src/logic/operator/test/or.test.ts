import { staticAssertType } from '../../../util'

import type { Or } from '../or'

staticAssertType<Or<true, true>>(true)
staticAssertType<Or<true, false>>(true)
staticAssertType<Or<false, true>>(true)

staticAssertType<Or<false, false>>(false)

// @ts-expect-error
staticAssertType<Or<true, true>>(false)
// @ts-expect-error
staticAssertType<Or<true, false>>(false)
// @ts-expect-error
staticAssertType<Or<false, true>>(false)

// @ts-expect-error
staticAssertType<Or<false, false>>(true)
