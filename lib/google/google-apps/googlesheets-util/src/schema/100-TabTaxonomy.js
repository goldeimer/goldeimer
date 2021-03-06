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
} from '@gs/schema/template'

const TAB = withSection(makeTable(
    'Taxonomies',
    'taxonomy',
    'taxonomies',
    'Collections of classifications for map features',
    TableType.Default,
    100
), [[[
    [
        'name',
        'Name',
        'The (singular) name of the taxonomy',
        ColumnType.required
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
        ColumnType.optional,
        DataType.Bool
    ],
    { defaultValue: true }
],
[
    [
        'pluralName',
        'Plural Name',
        'Plural form of the name',
        ColumnType.optional
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
        ColumnType.optional
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
        ColumnType.optional
    ],
    { validations: { maxLength: 100 } }
]],
...SECTION_TEMPLATE_ESSENTIAL])

export default TAB
