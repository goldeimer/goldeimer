import {
    ColumnType,
    DataType,
    TableType
} from '../enum'

import {
    makeTable,
    withSection
} from './factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/000-Template'

const TAB = withSection(makeTable(
    'SearchLog',
    'search',
    'searches',
    '(Dissatisfactory) search result log',
    TableType.Log,
    0
), [[[
    [
        'result',
        'Result',
        'Chosen search result for query'
    ]
], [
    [
        'query',
        'Query',
        'Submitted search query'
    ]
], [
    [
        'featureCountWithin10k',
        'Feature count within 10k',
        'Features within 10 kilometers of the chosen place',
        ColumnType.required,
        DataType.Integer
    ],
    { validations: { min: 0 } }
], [
    [
        'featureCountWithin25k',
        'Feature count within 25k',
        'Features within 25 kilometers of the chosen place',
        ColumnType.required,
        DataType.Integer
    ],
    { validations: { min: 0 } }
]],
...SECTION_TEMPLATE_ESSENTIAL])

export default TAB
