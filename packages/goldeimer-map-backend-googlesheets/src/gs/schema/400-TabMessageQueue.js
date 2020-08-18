import {
    COLUMN_TYPE,
    DATA_TYPE,
    QUEUE_ITEM_STATUS,
    TABLE_TYPE,
    queueItemStatusKeyToColorPairs,
    queueItemStatusValueToColorPairs
} from '@gs/enum'

import {
    connectChild,
    makeTable,
    withSections
} from '@gs/schema/factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/template'

import TAB_FEATURE from '@gs/schema/200-TabFeature'

const TAB_BASE = makeTable(
    'MessageQueue',
    'message',
    'messages',
    'Messages submitted by users of the client application',
    TABLE_TYPE.queue,
    0
)

const TAB = withSections(TAB_BASE, [[[[
    [
        'feature',
        'Feature',
        'The feature the feedback is about',
        COLUMN_TYPE.required,
        DATA_TYPE.foreignKey
    ],
    { link: connectChild(TAB_FEATURE, TAB_BASE) }
],
[
    [
        'message',
        'Message',
        'The feedback iteself',
        COLUMN_TYPE.required
    ],
    { validations: { maxLength: 2000 } }
],
[
    [
        'status',
        'Status',
        'Status of operational message processing',
        COLUMN_TYPE.required,
        DATA_TYPE.enum,
        {
            defaultValue: QUEUE_ITEM_STATUS.new,
            enums: QUEUE_ITEM_STATUS.enums,
            keyToColorPairs: queueItemStatusKeyToColorPairs,
            valueToColorPairs: queueItemStatusValueToColorPairs
        }
    ]
]],
...SECTION_TEMPLATE_ESSENTIAL], [[[
    [
        'firstname',
        'Firstname',
        'Firstname of the submitting user',
        COLUMN_TYPE.optional
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'lastname',
        'Lastname',
        'Lastname of the submitting user',
        COLUMN_TYPE.optional
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'email',
        'Email',
        'Email address of the submitting user',
        COLUMN_TYPE.optional,
        DATA_TYPE.email
    ]
]], [
    'User data',
    'Personal information about the submitting user'
]]])

export default TAB
