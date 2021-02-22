import { staticAssertType } from '../../../util'

import type { Not } from '../not'

/// ----- `Truthy`: default options --------------------------------------------

staticAssertType<Not<false>>(true)
staticAssertType<Not<[false]>>(true)
staticAssertType<Not<[false, false]>>(true)
staticAssertType<Not<[false, false, false]>>(true)

staticAssertType<Not<'false'>>(true)
staticAssertType<Not<['false']>>(true)
staticAssertType<Not<['false', 'false']>>(true)
staticAssertType<Not<['false', 'false', 'false']>>(true)

staticAssertType<Not<0>>(true)
staticAssertType<Not<[0]>>(true)
staticAssertType<Not<[0, 0]>>(true)
staticAssertType<Not<[0, 0, 0]>>(true)

staticAssertType<Not<'0'>>(true)
staticAssertType<Not<['0']>>(true)
staticAssertType<Not<['0', '0']>>(true)
staticAssertType<Not<['0', '0', '0']>>(true)

staticAssertType<Not<[false, 'false', 0, '0']>>(true)

/// --- `Truthy`: `TrueType = 1` -----------------------------------------------

staticAssertType<Not<false, 1>>(1)
staticAssertType<Not<[false], 1>>(1)
staticAssertType<Not<[false, false], 1>>(1)
staticAssertType<Not<[false, false, false], 1>>(1)

staticAssertType<Not<'false', 1>>(1)
staticAssertType<Not<['false'], 1>>(1)
staticAssertType<Not<['false', 'false'], 1>>(1)
staticAssertType<Not<['false', 'false', 'false'], 1>>(1)

staticAssertType<Not<0, 1>>(1)
staticAssertType<Not<[0], 1>>(1)
staticAssertType<Not<[0, 0], 1>>(1)
staticAssertType<Not<[0, 0, 0], 1>>(1)

staticAssertType<Not<'0', 1>>(1)
staticAssertType<Not<['0'], 1>>(1)
staticAssertType<Not<['0', '0'], 1>>(1)
staticAssertType<Not<['0', '0', '0'], 1>>(1)

staticAssertType<Not<[false, 'false', 0, '0'], 1>>(1)

/// ----- `Falsy`: default options ---------------------------------------------

staticAssertType<Not<true>>(false)
staticAssertType<Not<[true]>>(false)
staticAssertType<Not<[true, true]>>(false)
staticAssertType<Not<[true, true, true]>>(false)

staticAssertType<Not<'true'>>(false)
staticAssertType<Not<['true']>>(false)
staticAssertType<Not<['true', 'true']>>(false)
staticAssertType<Not<['true', 'true', 'true']>>(false)

staticAssertType<Not<1>>(false)
staticAssertType<Not<[1]>>(false)
staticAssertType<Not<[1, 1]>>(false)
staticAssertType<Not<[1, 1, 1]>>(false)

staticAssertType<Not<'1'>>(false)
staticAssertType<Not<['1']>>(false)
staticAssertType<Not<['1', '1']>>(false)
staticAssertType<Not<['1', '1', '1']>>(false)

staticAssertType<Not<[true, 'true', 1, '1']>>(false)

/// --- `Falsy`: `FalseType = 0` -----------------------------------------------

staticAssertType<Not<true, 1, 0>>(0)
staticAssertType<Not<[true], 1, 0>>(0)
staticAssertType<Not<[true, true], 1, 0>>(0)
staticAssertType<Not<[true, true, true], 1, 0>>(0)

staticAssertType<Not<'true', 1, 0>>(0)
staticAssertType<Not<['true'], 1, 0>>(0)
staticAssertType<Not<['true', 'true'], 1, 0>>(0)
staticAssertType<Not<['true', 'true', 'true'], 1, 0>>(0)

staticAssertType<Not<1, 1, 0>>(0)
staticAssertType<Not<[1], 1, 0>>(0)
staticAssertType<Not<[1, 1], 1, 0>>(0)
staticAssertType<Not<[1, 1, 1], 1, 0>>(0)

staticAssertType<Not<'1', 1, 0>>(0)
staticAssertType<Not<['1'], 1, 0>>(0)
staticAssertType<Not<['1', '1'], 1, 0>>(0)
staticAssertType<Not<['1', '1', '1'], 1, 0>>(0)

staticAssertType<Not<[true, 'true', 1, '1'], 1, 0>>(0)

/// ----- Mixed values, not accepted (not implemented?)-------------------------

// TODO(Johannes):
// Flip individual members?
// (Evaluate whether semantically correct place.)

// @ts-expect-error
staticAssertType<Not<[true, false]>>(false)
// @ts-expect-error
staticAssertType<Not<[false, true, true]>>(false)

// @ts-expect-error
staticAssertType<Not<['true', 'false']>>(false)
// @ts-expect-error
staticAssertType<Not<['false', 'true', 'true']>>(false)

// @ts-expect-error
staticAssertType<Not<[1, 0]>>(false)
// @ts-expect-error
staticAssertType<Not<[0, 1, 1]>>(false)

// @ts-expect-error
staticAssertType<Not<['1', '0']>>(false)
// @ts-expect-error
staticAssertType<Not<['0', '1', '1']>>(false)

// @ts-expect-error
staticAssertType<Not<[true, 'true', 1, '1', false]>>(false)
// @ts-expect-error
staticAssertType<Not<[true, 'true', 1, '1', 'false']>>(false)
// @ts-expect-error
staticAssertType<Not<[true, 'true', 1, '1', 0]>>(false)
// @ts-expect-error
staticAssertType<Not<[true, 'true', 1, '1', '0']>>(false)
