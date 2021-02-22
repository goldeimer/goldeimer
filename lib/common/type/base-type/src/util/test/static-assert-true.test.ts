import { staticAssertTrue } from '../static-assert'

staticAssertTrue(true)
staticAssertTrue<true>(true)

// @ts-expect-error
staticAssertTrue()
// @ts-expect-error
staticAssertTrue<true>()
// @ts-expect-error
staticAssertTrue(false)
// @ts-expect-error
staticAssertTrue<false>(false)
// @ts-expect-error
staticAssertTrue<boolean>(true)
// @ts-expect-error
staticAssertTrue<boolean>(false)
// @ts-expect-error
staticAssertTrue(0)
// @ts-expect-error
staticAssertTrue<0>()
// @ts-expect-error
staticAssertTrue<0>(0)
// @ts-expect-error
staticAssertTrue(1)
// @ts-expect-error
staticAssertTrue<1>()
// @ts-expect-error
staticAssertTrue<1>(1)
// @ts-expect-error
staticAssertTrue(null)
// @ts-expect-error
staticAssertTrue(undefined)
// @ts-expect-error
staticAssertTrue('')
// @ts-expect-error
staticAssertTrue<''>()
// @ts-expect-error
staticAssertTrue<''>('')
// @ts-expect-error
staticAssertTrue('0')
// @ts-expect-error
staticAssertTrue<'0'>()
// @ts-expect-error
staticAssertTrue<'0'>('0')
// @ts-expect-error
staticAssertTrue('true')
// @ts-expect-error
staticAssertTrue<'true'>()
// @ts-expect-error
staticAssertTrue<'true'>('true')
