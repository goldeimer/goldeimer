import {
    COLUMN_TYPE,
    DATA_TYPE,
    TABLE_TYPE
} from '@gs/enum'

import {
    makeTable,
    withSections
} from '@gs/schema/factory'

const TAB_BASE = makeTable(
    'Themes',
    'theme',
    'themes',
    'Customize themeable appearance & content in multiple variations',
    TABLE_TYPE.configMultiple
)

const TAB = withSections(TAB_BASE, [[[[
    [
        'slug',
        'Slug',
        '(Short) string identifier used in e.g. URL query params'
    ], {
        validations: {
            maxLength: 10,
            noWhitespace: true
        }
    }
], [
    [
        'name',
        'Name',
        'The human-readable name of the theme',
        COLUMN_TYPE.optional
    ],
    { validations: { maxLength: 50 } }
]], [
    'Theme identifier',
    'What the theme\'s called'
]], [[[
    [
        'colorPrimaryMain',
        'Primary color, main',
        'Main shade of primary color',
        COLUMN_TYPE.required,
        DATA_TYPE.color
    ]
], [
    [
        'colorPrimaryLight',
        'Primary color, light',
        'Light shade of primary color',
        COLUMN_TYPE.optional,
        DATA_TYPE.color
    ]
], [
    [
        'colorPrimaryDark',
        'Primary color, dark',
        'Dark shade of primary color',
        COLUMN_TYPE.optional,
        DATA_TYPE.color
    ]
], [
    [
        'colorPrimaryContrastText',
        'Primary color, (text) contrast',
        'Contrast shade (for text ontop) of primary color',
        COLUMN_TYPE.optional,
        DATA_TYPE.color
    ]
]], [
    'Color palette',
    'Configure the theme\'s colors and their variations'
]]])

export default TAB
