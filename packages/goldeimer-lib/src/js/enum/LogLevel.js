import makeEnum from '@lib/enum/makeEnum'

const { enum: LOG_LEVEL } = makeEnum([
    'info',
    'warning',
    'error'
], 'LogLevel')

export default LOG_LEVEL
