import {
    ColumnType,
    DataType,
    QueueItemStatus,
    TableType,
    queueItemStatusKeyToColorPairs,
    queueItemStatusValueToColorPairs
} from '../enum'

import {
    connectChild,
    makeTable,
    withSections
} from './factory'

import {
    SECTION_TEMPLATE_ESSENTIAL
} from '@gs/schema/template'

import TAB_FEATURE from '@gs/schema/200-TabFeature'

const TAB_BASE = makeTable(
    'MessageQueue',
    'message',
    'messages',
    'Messages submitted by users of the client application',
    TableType.Queue,
    0
)

const TAB = withSections(TAB_BASE, [[[[
    [
        'feature',
        'Feature',
        'The feature the feedback is about',
        ColumnType.required,
        DataType.ForeignKey
    ],
    { link: connectChild(TAB_FEATURE, TAB_BASE) }
],
[
    [
        'message',
        'Message',
        'The feedback iteself',
        ColumnType.required
    ],
    { validations: { maxLength: 2000 } }
],
[
    [
        'status',
        'Status',
        'Status of operational message processing',
        ColumnType.required,
        DataType.Enum,
        {
            defaultValue: QueueItemStatus.new,
            enums: QueueItemStatus.enums,
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
        ColumnType.optional
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'lastname',
        'Lastname',
        'Lastname of the submitting user',
        ColumnType.optional
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'email',
        'Email',
        'Email address of the submitting user',
        ColumnType.optional,
        DataType.Email
    ]
]], [
    'User data',
    'Personal information about the submitting user'
]]])

export default TAB
