import {
    ColumnType,
    DataType,
    TableType
} from '@goldeimer/data-util'

import {
    makeTable,
    withSections
} from './factory'

export const TabTheme = withSections(makeTable(
    'Themes',
    'theme',
    'themes',
    'Customize themeable appearance & content in multiple variations',
    TableType.ConfigMultiple
), [[[[
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
        ColumnType.Optional
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
        ColumnType.Required,
        DataType.Color
    ]
], [
    [
        'colorPrimaryLight',
        'Primary color, light',
        'Light shade of primary color',
        ColumnType.Optional,
        DataType.Color
    ]
], [
    [
        'colorPrimaryDark',
        'Primary color, dark',
        'Dark shade of primary color',
        ColumnType.Optional,
        DataType.Color
    ]
], [
    [
        'colorPrimaryContrastText',
        'Primary color, (text) contrast',
        'Contrast shade (for text ontop) of primary color',
        ColumnType.Optional,
        DataType.Color
    ]
]], [
    'Color palette',
    'Configure the theme\'s colors and their variations'
]]])
