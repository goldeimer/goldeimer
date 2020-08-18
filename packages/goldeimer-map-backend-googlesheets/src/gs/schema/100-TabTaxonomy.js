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
} from '@gs/schema/template'

const TAB = withSection(makeTable(
    'Taxonomies',
    'taxonomy',
    'taxonomies',
    'Collections of classifications for map features',
    TABLE_TYPE.default,
    100
), [[[
    [
        'name',
        'Name',
        'The (singular) name of the taxonomy',
        COLUMN_TYPE.required
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'allowMultipleTerms',
        'Allow multiple terms',
        `Whether an individual map feature can be assigned
multiple terms of one and the same taxonomy
(or whether terms are mutually exclusive, respectively)`,
        COLUMN_TYPE.optional,
        DATA_TYPE.bool
    ],
    { defaultValue: true }
],
[
    [
        'pluralName',
        'Plural Name',
        'Plural form of the name',
        COLUMN_TYPE.optional
    ],
    { validations: { maxLength: 52 } }
],
[
    [
        'filterLabelCopy',
        'Filter label',
        [
            'Label copy used in filter settings',
            '\'Name\''
        ],
        COLUMN_TYPE.optional
    ],
    { validations: { maxLength: 100 } }
],
[
    [
        'infoLabelCopy',
        'Info label',
        [
            'Label copy used in map marker info UIs',
            '\'Name\''
        ],
        COLUMN_TYPE.optional
    ],
    { validations: { maxLength: 100 } }
]],
...SECTION_TEMPLATE_ESSENTIAL])

export default TAB
