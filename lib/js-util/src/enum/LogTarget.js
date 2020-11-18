import makeEnum from './makeEnum'

const { enum: LogTarget } = makeEnum([
    'CONSOLE',
    'DATABASE'
])

export default LogTarget
