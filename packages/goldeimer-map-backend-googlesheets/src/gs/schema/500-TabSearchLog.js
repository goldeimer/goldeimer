import {
    COLUMN_TYPE,
    DATA_TYPE,
    TABLE_TYPE
} from '@gs/enum'

import {
    makeTable,
    withSection
} from '@gs/schema/factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/000-Template'

const TAB = withSection(makeTable(
    'SearchLog',
    'search',
    'searches',
    '(Dissatisfactory) search result log',
    TABLE_TYPE.log,
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
        COLUMN_TYPE.required,
        DATA_TYPE.integer
    ],
    { validations: { min: 0 } }
], [
    [
        'featureCountWithin25k',
        'Feature count within 25k',
        'Features within 25 kilometers of the chosen place',
        COLUMN_TYPE.required,
        DATA_TYPE.integer
    ],
    { validations: { min: 0 } }
]],
...SECTION_TEMPLATE_ESSENTIAL])

export default TAB
