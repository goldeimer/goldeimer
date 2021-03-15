import { identity } from '@goldeimer/js-util'

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
