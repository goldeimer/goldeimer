import {
    ColumnType,
    DataType,
    GEOCODING_STATUS,
    PublicationStatus,
    TableType,
    geoCodingStatusKeyToColorPairs,
    geoCodingStatusValueToColorPairs,
    publicationStatusKeyToColorPairs,
    publicationStatusValueToColorPairs
} from '../enum'

import {
    makeTable,
    withSections
} from './factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/template'

const TAB = withSections(makeTable(
    'Features',
    'feature',
    'features',
    `Places shown as map markers
 (or "Features" of type "Point", in the lingo of GeoJSON)`,
    TableType.Default,
    1e4
), [[[[
    [
        'name',
        'Place name',
        `The name of the location, POI, business,
or whatever it is you are displaying`
    ],
    { validations: { maxLength: 100 } }
],
[
    [
        'geocodingStatus',
        'Geocoding Status',
        `Whether the feature has been found
by the geocoding service and been assigned coordinates`,
        ColumnType.required,
        DataType.Enum
    ],
    {
        defaultValue: GEOCODING_STATUS.notAttempted,
        enums: GEOCODING_STATUS.enums,
        keyToColorPairs: geoCodingStatusKeyToColorPairs,
        valueToColorPairs: geoCodingStatusValueToColorPairs
    }
],
[
    [
        'publicationStatus',
        'Publication Status',
        'Whether the feature is currently visible to client users',
        ColumnType.required,
        DataType.Enum
    ],
    {
        defaultValue: PublicationStatus.published,
        enums: PublicationStatus.enums,
        keyToColorPairs: publicationStatusKeyToColorPairs,
        valueToColorPairs: publicationStatusValueToColorPairs
    }
]],
...SECTION_TEMPLATE_ESSENTIAL], [[[
    [
        'addressLine1',
        'Address Line 1',
        'The first line of the address (street & apt number)'
    ],
    { validations: { maxLength: 100 } }
],
[
    [
        'addressLine2',
        'Address Line 2',
        'Optional second address line',
        ColumnType.optional
    ],
    { validations: { maxLength: 100 } }
],
[
    [
        'city',
        'City',
        'The city the feature is located in'
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'postCode',
        'Post Code',
        'The post code of the feature',
        ColumnType.optional
    ],
    { validations: { isPostCode: true } }
],
[
    [
        'country',
        'Country',
        'The country the feature is located in',
        ColumnType.optional
    ],
    { validations: { maxLength: 50 } }
]], [
    'Address',
    'Adress data associated with @RECORD_PLURAL_NAME@'
]
], [[[
    [
        'url',
        'Website URL',
        'URL of the feature\'s website',
        ColumnType.optional,
        DataType.Url
    ]
],
[
    [
        'phone',
        'Phone number',
        'The phone number of the place',
        ColumnType.optional,
        DataType.PhoneNumber
    ]
],
[
    [
        'email',
        'Email',
        'The feature\'s email address',
        ColumnType.optional,
        DataType.Email
    ]
]], [
    'Contact',
    'Contact & information channels'
]]])

export default TAB
