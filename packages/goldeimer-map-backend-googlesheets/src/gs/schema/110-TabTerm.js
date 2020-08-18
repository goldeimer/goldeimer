import {
    COLUMN_TYPE,
    DATA_TYPE,
    TABLE_TYPE
} from '@gs/enum'

import {
    connectChild,
    makeTable,
    withSections
} from '@gs/schema/factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/template'

import TAB_TAXONOMY from '@gs/schema/100-TabTaxonomy'

const TAB_BASE = makeTable(
    'Terms',
    'term',
    'terms',
    'One particular expression of a taxonomy',
    TABLE_TYPE.default,
    200
)

const TAB = withSections(TAB_BASE, [[[[
    [
        'name',
        'Name',
        'The name of the term',
        COLUMN_TYPE.required
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'taxonomy',
        'Parent Taxonomy',
        `The term's parent taxonomy,
under which related terms are grouped`,
        COLUMN_TYPE.required,
        DATA_TYPE.foreignKey
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
        COLUMN_TYPE.optional,
        DATA_TYPE.color
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
        COLUMN_TYPE.optional,
        DATA_TYPE.color
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
        COLUMN_TYPE.optional,
        DATA_TYPE.color
    ]
],
[
    [
        'colorContrastText',
        'Contrast text color',
        'A color for text, contrasting the above three',
        COLUMN_TYPE.optional,
        DATA_TYPE.color
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
        COLUMN_TYPE.optional,
        DATA_TYPE.icon
    ]
]], [
    'Appearance',
    'Configure the appearance of the @RECORD_NAME@'
]]])

export default TAB
