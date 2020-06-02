import Enum from 'enum'

const makeEnum = (...args) => new Enum(...args, { freeze: true })

export default makeEnum
