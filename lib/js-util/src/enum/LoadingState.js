import makeEnum from './makeEnum'

const { enum: LoadingState } = makeEnum([
    'IDLE',
    'PENDING',
    'ERROR'
])

export default LoadingState
