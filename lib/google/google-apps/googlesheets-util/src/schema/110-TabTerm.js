import {
    ColumnType,
    DataType,
    TableType
} from '../enum'

import {
    connectChild,
    makeTable,
    withSections
} from './factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/template'

import TAB_TAXONOMY from '@gs/schema/100-TabTaxonomy'

const TAB_BASE = makeTable(
    'Terms',
    'term',
    'terms',
    'One particular expression of a taxonomy',
    TableType.Default,
    200
)

const TAB = withSections(TAB_BASE, [[[[
    [
        'name',
        'Name',
        'The name of the term',
        ColumnType.required
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'taxonomy',
        'Parent Taxonomy',
        `The term's parent taxonomy,
under which related terms are grouped`,
        ColumnType.required,
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
        ColumnType.optional,
        DataType.color
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
        ColumnType.optional,
        DataType.color
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
        ColumnType.optional,
        DataType.color
    ]
],
[
    [
        'colorContrastText',
        'Contrast text color',
        'A color for text, contrasting the above three',
        ColumnType.optional,
        DataType.color
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
        ColumnType.optional,
        DataType.icon
    ]
]], [
    'Appearance',
    'Configure the appearance of the @RECORD_NAME@'
]]])

export default TAB
