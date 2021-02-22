import { staticAssertType } from '../../../util'

import type { And } from '../and'

/// ----- `Truthy`: default options --------------------------------------------

staticAssertType<And<true, true>>(true)
staticAssertType<And<'true', 'true'>>(true)
staticAssertType<And<1, 1>>(true)
staticAssertType<And<'1', '1'>>(true)

staticAssertType<And<true, 'true'>>(true)
staticAssertType<And<true, 1>>(true)
staticAssertType<And<true, '1'>>(true)

staticAssertType<And<'true', true>>(true)
staticAssertType<And<'true', 1>>(true)
staticAssertType<And<'true', '1'>>(true)

staticAssertType<And<1, true>>(true)
staticAssertType<And<1, 'true'>>(true)
staticAssertType<And<1, '1'>>(true)

staticAssertType<And<'1', true>>(true)
staticAssertType<And<'1', 'true'>>(true)
staticAssertType<And<'1', 1>>(true)

/// --- `Truthy`: `TrueType = 1` -----------------------------------------------


staticAssertType<And<true, true, 1>>(1)
staticAssertType<And<'true', 'true', 1>>(1)
staticAssertType<And<1, 1, 1>>(1)
staticAssertType<And<'1', '1', 1>>(1)

staticAssertType<And<true, 'true', 1>>(1)
staticAssertType<And<true, 1, 1>>(1)
staticAssertType<And<true, '1', 1>>(1)

staticAssertType<And<'true', true, 1>>(1)
staticAssertType<And<'true', 1, 1>>(1)
staticAssertType<And<'true', '1', 1>>(1)

staticAssertType<And<1, true, 1>>(1)
staticAssertType<And<1, 'true', 1>>(1)
staticAssertType<And<1, '1', 1>>(1)

staticAssertType<And<'1', true, 1>>(1)
staticAssertType<And<'1', 'true', 1>>(1)
staticAssertType<And<'1', 1, 1>>(1)

/// --- `Truthy`: wrong `TrueType` ---------------------------------------------

// @ts-expect-error
staticAssertType<And<true, true>>(1)
// @ts-expect-error
staticAssertType<And<'true', 'true'>>(1)
// @ts-expect-error
staticAssertType<And<1, 1>>(1)
// @ts-expect-error
staticAssertType<And<'1', '1'>>(1)

// @ts-expect-error
staticAssertType<And<true, 'true'>>(1)
// @ts-expect-error
staticAssertType<And<true, 1>>(1)
// @ts-expect-error
staticAssertType<And<true, '1'>>(1)

// @ts-expect-error
staticAssertType<And<'true', true>>(1)
// @ts-expect-error
staticAssertType<And<'true', 1>>(1)
// @ts-expect-error
staticAssertType<And<'true', '1'>>(1)

// @ts-expect-error
staticAssertType<And<1, true>>(1)
// @ts-expect-error
staticAssertType<And<1, 'true'>>(1)
// @ts-expect-error
staticAssertType<And<1, '1'>>(1)

// @ts-expect-error
staticAssertType<And<'1', true>>(1)
// @ts-expect-error
staticAssertType<And<'1', 'true'>>(1)
// @ts-expect-error
staticAssertType<And<'1', 1>>(1)

/// ----- `Falsy`: default options ---------------------------------------------

staticAssertType<And<false, false>>(false)
staticAssertType<And<'false', 'false'>>(false)
staticAssertType<And<0, 0>>(false)
staticAssertType<And<'0', '0'>>(false)

staticAssertType<And<false, 'false'>>(false)
staticAssertType<And<false, 0>>(false)
staticAssertType<And<false, '0'>>(false)

staticAssertType<And<'false', false>>(false)
staticAssertType<And<'false', 0>>(false)
staticAssertType<And<'false', '0'>>(false)

staticAssertType<And<0, false>>(false)
staticAssertType<And<0, 'false'>>(false)
staticAssertType<And<0, '0'>>(false)

staticAssertType<And<'0', false>>(false)
staticAssertType<And<'0', 'false'>>(false)
staticAssertType<And<'0', 0>>(false)

/// --- `Falsy`: `FalseType = 0` -----------------------------------------------

staticAssertType<And<false, false, 1, 0>>(0)
staticAssertType<And<'false', 'false', 1, 0>>(0)
staticAssertType<And<0, 0, 1, 0>>(0)
staticAssertType<And<'0', '0', 1, 0>>(0)

staticAssertType<And<false, 'false', 1, 0>>(0)
staticAssertType<And<false, 0, 1, 0>>(0)
staticAssertType<And<false, '0', 1, 0>>(0)

staticAssertType<And<'false', false, 1, 0>>(0)
staticAssertType<And<'false', 0, 1, 0>>(0)
staticAssertType<And<'false', '0', 1, 0>>(0)

staticAssertType<And<0, false, 1, 0>>(0)
staticAssertType<And<0, 'false', 1, 0>>(0)
staticAssertType<And<0, '0', 1, 0>>(0)

staticAssertType<And<'0', false, 1, 0>>(0)
staticAssertType<And<'0', 'false', 1, 0>>(0)
staticAssertType<And<'0', 0, 1, 0>>(0)

/// --- `Falsy`: wrong `FalseType` ---------------------------------------------

// @ts-expect-error
staticAssertType<And<false, false, 1>>(0)
// @ts-expect-error
staticAssertType<And<'false', 'false', 1>>(0)
// @ts-expect-error
staticAssertType<And<0, 0, 1>>(0)
// @ts-expect-error
staticAssertType<And<'0', '0', 1>>(0)

// @ts-expect-error
staticAssertType<And<false, 'false', 1>>(0)
// @ts-expect-error
staticAssertType<And<false, 0, 1>>(0)
// @ts-expect-error
staticAssertType<And<false, '0', 1>>(0)

// @ts-expect-error
staticAssertType<And<'false', false, 1>>(0)
// @ts-expect-error
staticAssertType<And<'false', 0, 1>>(0)
// @ts-expect-error
staticAssertType<And<'false', '0', 1>>(0)

// @ts-expect-error
staticAssertType<And<0, false, 1>>(0)
// @ts-expect-error
staticAssertType<And<0, 'false', 1>>(0)
// @ts-expect-error
staticAssertType<And<0, '0', 1>>(0)

// @ts-expect-error
staticAssertType<And<'0', false, 1>>(0)
// @ts-expect-error
staticAssertType<And<'0', 'false', 1>>(0)
// @ts-expect-error
staticAssertType<And<'0', 0, 1>>(0)

/// ----- Mixed values, still `FalseType` --------------------------------------

staticAssertType<And<true, false>>(false)
staticAssertType<And<false, true>>(false)

staticAssertType<And<'true', 'false'>>(false)
staticAssertType<And<'false', 'true'>>(false)

staticAssertType<And<1, 0>>(false)
staticAssertType<And<0, 1>>(false)

staticAssertType<And<'1', '0'>>(false)
staticAssertType<And<'0', '1'>>(false)

staticAssertType<And<true, 'false'>>(false)
staticAssertType<And<true, 0>>(false)
staticAssertType<And<true, '0'>>(false)
