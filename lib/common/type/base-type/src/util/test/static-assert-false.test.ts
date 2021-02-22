import { staticAssertFalse } from '../static-assert'

staticAssertFalse(false)
staticAssertFalse<false>(false)

// @ts-expect-error
staticAssertFalse()
// @ts-expect-error
staticAssertFalse<false>()
// @ts-expect-error
staticAssertFalse(true)
// @ts-expect-error
staticAssertFalse<true>(true)
// @ts-expect-error
staticAssertFalse<boolean>(false)
// @ts-expect-error
staticAssertFalse<boolean>(true)
// @ts-expect-error
staticAssertFalse(0)
// @ts-expect-error
staticAssertFalse<0>()
// @ts-expect-error
staticAssertFalse<0>(0)
// @ts-expect-error
staticAssertFalse(1)
// @ts-expect-error
staticAssertFalse<1>()
// @ts-expect-error
staticAssertFalse<1>(1)
// @ts-expect-error
staticAssertFalse(null)
// @ts-expect-error
staticAssertFalse(undefined)
// @ts-expect-error
staticAssertFalse('')
// @ts-expect-error
staticAssertFalse<''>()
// @ts-expect-error
staticAssertFalse<''>('')
// @ts-expect-error
staticAssertFalse('0')
// @ts-expect-error
staticAssertFalse<'0'>()
// @ts-expect-error
staticAssertFalse<'0'>('0')
// @ts-expect-error
staticAssertFalse('false')
// @ts-expect-error
staticAssertFalse<'false'>()
// @ts-expect-error
staticAssertFalse<'false'>('false')
