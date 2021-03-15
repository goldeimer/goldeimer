import { makeEnum } from '@goldeimer/js-util'

const { enum: LOG_TableType } = makeEnum([
    'runtime',
    'searchResult'
])

export default LOG_TableType
