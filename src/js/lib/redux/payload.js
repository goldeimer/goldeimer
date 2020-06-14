import { identity } from '@lib/util/noop'

const payload = (transformation = identity) => (
    state,
    { payload: value }
) => transformation(value, state)

const payloadValue = (transformation = identity) => (
    state,
    { payload: { value } }
) => transformation(value, state)

export {
    payload as default,
    payloadValue
}
