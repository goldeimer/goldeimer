import {
    ColumnType,
    DataType,
    TableType
} from '@goldeimer/data-util'

import {
    connectChild,
    makeTable,
    withSections
} from './factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from './template'

import { TabTaxonomy } from './100-TabTaxonomy'

const baseTable = makeTable(
    'Terms',
    'term',
    'terms',
    'One particular expression of a taxonomy',
    TableType.Default,
    200
)

export const TabTerm = withSections(baseTable, [[[[
    [
        'name',
        'Name',
        'The name of the term',
        ColumnType.Required
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'taxonomy',
        'Parent Taxonomy',
        `The term's parent taxonomy,
under which related terms are grouped`,
        ColumnType.Required,
        DataType.ForeignKey
    ],
    { link: connectChild(TAB_TAXONOMY, TAB_BASE) }
]],
...SECTION_TEMPLATE_ESSENTIAL], [[[
    [
        'colorMain',
        'Main color',
        [
            'A color visually identifying the term',
            `a color as per the application's theme's
color palette`
        ],
        ColumnType.Optional,
        DataType.Color
    ]
],
[
    [
        'colorLight',
        'Light color',
        [
            'A lighter shade of the associated color',
            '\'Main Color\''
        ],
        ColumnType.Optional,
        DataType.Color
    ]
],
[
    [
        'colorDark',
        'Dark color',
        [
            'A darker shade of the associated color',
            '\'Main Color\''
        ],
        ColumnType.Optional,
        DataType.Color
    ]
],
[
    [
        'colorContrastText',
        'Contrast text color',
        'A color for text, contrasting the above three',
        ColumnType.Optional,
        DataType.Color
    ]
],
[
    [
        'icon',
        'Icon',
        [
            `An icon visually identifying the term
(the list of choices is subject to future growth)`,
            'a generic map marker symbol'
        ],
        ColumnType.Optional,
        DataType.Icon
    ]
]], [
    'Appearance',
    'Configure the appearance of the @RECORD_NAME@'
]]])
