import {
    constantCase,
    paramCase
} from 'change-case'

const makeEnum = (
    keys
) => Object.fromEntries(keys.map((key) => [
    constantCase(key),
    paramCase(key)
]))

export default makeEnum
