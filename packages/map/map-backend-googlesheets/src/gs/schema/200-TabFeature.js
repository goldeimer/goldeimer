import {
    COLUMN_TYPE,
    DATA_TYPE,
    GEOCODING_STATUS,
    PUBLICATION_STATUS,
    TABLE_TYPE,
    geoCodingStatusKeyToColorPairs,
    geoCodingStatusValueToColorPairs,
    publicationStatusKeyToColorPairs,
    publicationStatusValueToColorPairs
} from '@gs/enum'

import {
    makeTable,
    withSections
} from '@gs/schema/factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/template'

const TAB = withSections(makeTable(
    'Features',
    'feature',
    'features',
    `Places shown as map markers
 (or "Features" of type "Point", in the lingo of GeoJSON)`,
    TABLE_TYPE.default,
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
        COLUMN_TYPE.required,
        DATA_TYPE.enum
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
        COLUMN_TYPE.required,
        DATA_TYPE.enum
    ],
    {
        defaultValue: PUBLICATION_STATUS.published,
        enums: PUBLICATION_STATUS.enums,
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
        COLUMN_TYPE.optional
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
        COLUMN_TYPE.optional
    ],
    { validations: { isPostCode: true } }
],
[
    [
        'country',
        'Country',
        'The country the feature is located in',
        COLUMN_TYPE.optional
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
        COLUMN_TYPE.optional,
        DATA_TYPE.url
    ]
],
[
    [
        'phone',
        'Phone number',
        'The phone number of the place',
        COLUMN_TYPE.optional,
        DATA_TYPE.phone
    ]
],
[
    [
        'email',
        'Email',
        'The feature\'s email address',
        COLUMN_TYPE.optional,
        DATA_TYPE.email
    ]
]], [
    'Contact',
    'Contact & information channels'
]]])

export default TAB
