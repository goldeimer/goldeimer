import { identity } from '@lib/util/noop'

const payload = (transformation = identity) => (
    state,
    { payload: value }
) => transformation(value, state)

export default payload
