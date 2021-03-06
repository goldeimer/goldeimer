import {
    ColumnType,
    DataType,
    TableType
} from '@goldeimer/data-util'

import {
    makeTable,
    withSection
} from './factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from './template'

export const TabTaxonomy = withSection(makeTable(
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
        ColumnType.Required
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
        ColumnType.Optional,
        DataType.Bool
    ],
    { defaultValue: true }
],
[
    [
        'pluralName',
        'Plural Name',
        'Plural form of the name',
        ColumnType.Optional
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
        ColumnType.Optional
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
        ColumnType.Optional
    ],
    { validations: { maxLength: 100 } }
]],
...SECTION_TEMPLATE_ESSENTIAL])
