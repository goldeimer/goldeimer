import { staticAssertType } from '../../../util'

import type { All } from '../all'

/// ----- `Truthy`: default options --------------------------------------------

staticAssertType<All<true>>(true)
staticAssertType<All<[true]>>(true)
staticAssertType<All<[true, true]>>(true)
staticAssertType<All<[true, true, true]>>(true)

staticAssertType<All<'true'>>(true)
staticAssertType<All<['true']>>(true)
staticAssertType<All<['true', 'true']>>(true)
staticAssertType<All<['true', 'true', 'true']>>(true)

staticAssertType<All<1>>(true)
staticAssertType<All<[1]>>(true)
staticAssertType<All<[1, 1]>>(true)
staticAssertType<All<[1, 1, 1]>>(true)

staticAssertType<All<'1'>>(true)
staticAssertType<All<['1']>>(true)
staticAssertType<All<['1', '1']>>(true)
staticAssertType<All<['1', '1', '1']>>(true)

staticAssertType<All<[true, 'true', 1, '1']>>(true)

/// --- `Truthy`: `TrueType = 1` -----------------------------------------------

staticAssertType<All<true, 1>>(1)
staticAssertType<All<[true], 1>>(1)
staticAssertType<All<[true, true], 1>>(1)
staticAssertType<All<[true, true, true], 1>>(1)

staticAssertType<All<'true', 1>>(1)
staticAssertType<All<['true'], 1>>(1)
staticAssertType<All<['true', 'true'], 1>>(1)
staticAssertType<All<['true', 'true', 'true'], 1>>(1)

staticAssertType<All<1, 1>>(1)
staticAssertType<All<[1], 1>>(1)
staticAssertType<All<[1, 1], 1>>(1)
staticAssertType<All<[1, 1, 1], 1>>(1)

staticAssertType<All<'1', 1>>(1)
staticAssertType<All<['1'], 1>>(1)
staticAssertType<All<['1', '1'], 1>>(1)
staticAssertType<All<['1', '1', '1'], 1>>(1)

staticAssertType<All<[true, 'true', 1, '1'], 1>>(1)

/// --- `Truthy`: wrong `TrueType` ---------------------------------------------

// @ts-expect-error
staticAssertType<All<true>>(1)
// @ts-expect-error
staticAssertType<All<[true, true, true]>>(1)

// @ts-expect-error
staticAssertType<All<'true'>>(1)
// @ts-expect-error
staticAssertType<All<['true', 'true', 'true']>>(1)

// @ts-expect-error
staticAssertType<All<1>>(1)
// @ts-expect-error
staticAssertType<All<[1, 1, 1]>>(1)

// @ts-expect-error
staticAssertType<All<'1'>>(1)
// @ts-expect-error
staticAssertType<All<['1', '1', '1']>>(1)

// @ts-expect-error
staticAssertType<All<[true, 'true', 1, '1']>>(1)

/// ----- `Falsy`: default options ---------------------------------------------

staticAssertType<All<false>>(false)
staticAssertType<All<[false]>>(false)
staticAssertType<All<[false, false]>>(false)
staticAssertType<All<[false, false, false]>>(false)

staticAssertType<All<'false'>>(false)
staticAssertType<All<['false']>>(false)
staticAssertType<All<['false', 'false']>>(false)
staticAssertType<All<['false', 'false', 'false']>>(false)

staticAssertType<All<0>>(false)
staticAssertType<All<[0]>>(false)
staticAssertType<All<[0, 0]>>(false)
staticAssertType<All<[0, 0, 0]>>(false)

staticAssertType<All<'0'>>(false)
staticAssertType<All<['0']>>(false)
staticAssertType<All<['0', '0']>>(false)
staticAssertType<All<['0', '0', '0']>>(false)

staticAssertType<All<[false, 'false', 0, '0']>>(false)

/// --- `Falsy`: `FalseType = 0` -----------------------------------------------

staticAssertType<All<false, 1, 0>>(0)
staticAssertType<All<[false], 1, 0>>(0)
staticAssertType<All<[false, false], 1, 0>>(0)
staticAssertType<All<[false, false, false], 1, 0>>(0)

staticAssertType<All<'false', 1, 0>>(0)
staticAssertType<All<['false'], 1, 0>>(0)
staticAssertType<All<['false', 'false'], 1, 0>>(0)
staticAssertType<All<['false', 'false', 'false'], 1, 0>>(0)

staticAssertType<All<0, 1, 0>>(0)
staticAssertType<All<[0], 1, 0>>(0)
staticAssertType<All<[0, 0], 1, 0>>(0)
staticAssertType<All<[0, 0, 0], 1, 0>>(0)

staticAssertType<All<'0', 1, 0>>(0)
staticAssertType<All<['0'], 1, 0>>(0)
staticAssertType<All<['0', '0'], 1, 0>>(0)
staticAssertType<All<['0', '0', '0'], 1, 0>>(0)

staticAssertType<All<[false, 'false', 0, '0'], 1, 0>>(0)

/// --- `Falsy`: wrong `FalseType` ---------------------------------------------

// @ts-expect-error
staticAssertType<All<false>>(0)
// @ts-expect-error
staticAssertType<All<[false, false, false]>>(0)

// @ts-expect-error
staticAssertType<All<'false'>>(0)
// @ts-expect-error
staticAssertType<All<['false', 'false', 'false']>>(0)

// @ts-expect-error
staticAssertType<All<0>>(0)
// @ts-expect-error
staticAssertType<All<[0, 0, 0]>>(0)

// @ts-expect-error
staticAssertType<All<'0'>>(0)
// @ts-expect-error
staticAssertType<All<['0', '0', '0']>>(0)

// @ts-expect-error
staticAssertType<All<[false, 'false', 0, '0']>>(0)

/// ----- Mixed values, still `FalseType` --------------------------------------

staticAssertType<All<[true, false]>>(false)
staticAssertType<All<[false, true, true]>>(false)

staticAssertType<All<['true', 'false']>>(false)
staticAssertType<All<['false', 'true', 'true']>>(false)

staticAssertType<All<[1, 0]>>(false)
staticAssertType<All<[0, 1, 1]>>(false)

staticAssertType<All<['1', '0']>>(false)
staticAssertType<All<['0', '1', '1']>>(false)

staticAssertType<All<[true, 'true', 1, '1', false]>>(false)
staticAssertType<All<[true, 'true', 1, '1', 'false']>>(false)
staticAssertType<All<[true, 'true', 1, '1', 0]>>(false)
staticAssertType<All<[true, 'true', 1, '1', '0']>>(false)
