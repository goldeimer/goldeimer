import { makeEnum } from '@lib/enum'

const { enum: LOG_TABLE_TYPE } = makeEnum([
    'runtime',
    'searchResult'
])

export default LOG_TABLE_TYPE
