import makeEnum from './makeEnum'

const { enum: LogLevel } = makeEnum([
    'INFO',
    'WARNING',
    'ERROR'
], 'LogLevel')

export default LogLevel
