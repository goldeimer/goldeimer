import {
    ColumnType,
    DataType,
    TableType
} from '../enum'

import {
    makeTable,
    withSections
} from './factory'

const TAB_BASE = makeTable(
    'Themes',
    'theme',
    'themes',
    'Customize themeable appearance & content in multiple variations',
    TableType.ConfigMultiple
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
        ColumnType.optional
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
        ColumnType.required,
        DataType.color
    ]
], [
    [
        'colorPrimaryLight',
        'Primary color, light',
        'Light shade of primary color',
        ColumnType.optional,
        DataType.color
    ]
], [
    [
        'colorPrimaryDark',
        'Primary color, dark',
        'Dark shade of primary color',
        ColumnType.optional,
        DataType.color
    ]
], [
    [
        'colorPrimaryContrastText',
        'Primary color, (text) contrast',
        'Contrast shade (for text ontop) of primary color',
        ColumnType.optional,
        DataType.color
    ]
]], [
    'Color palette',
    'Configure the theme\'s colors and their variations'
]]])

export default TAB
