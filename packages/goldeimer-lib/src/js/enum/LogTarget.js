import makeEnum from '@lib/enum/makeEnum'

const { enum: LOG_TARGET } = makeEnum([
    'console',
    'database'
])

export default LOG_TARGET
