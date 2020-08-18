import makeEnum from '@lib/enum/makeEnum'

const { enum: LOADING_STATE } = makeEnum([
    'idle',
    'pending',
    'error'
])

export default LOADING_STATE
