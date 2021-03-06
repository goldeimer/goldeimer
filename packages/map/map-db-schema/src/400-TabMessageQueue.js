import {
    queueItemStatus2Color,
    ColumnType,
    DataType,
    QueueItemStatus,
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

import { TabFeature } from '@gs/schema/200-TabFeature'

const baseTable = makeTable(
    'MessageQueue',
    'message',
    'messages',
    'Messages submitted by users of the client application',
    TableType.Queue,
    0
)

export const TabMessageQueue = withSections(baseTable, [[[[
    [
        'feature',
        'Feature',
        'The feature the feedback is about',
        ColumnType.Required,
        DataType.ForeignKey
    ],
    { link: connectChild(TabFeature, baseTable) }
],
[
    [
        'message',
        'Message',
        'The feedback iteself',
        ColumnType.Required
    ],
    { validations: { maxLength: 2000 } }
],
[
    [
        'status',
        'Status',
        'Status of operational message processing',
        ColumnType.Required,
        DataType.Enum,
        {
            defaultValue: QueueItemStatus.New,
            enum: QueueItemStatus,
            enum2Color: queueItemStatus2Color
        }
    ]
]],
...SECTION_TEMPLATE_ESSENTIAL], [[[
    [
        'firstname',
        'Firstname',
        'Firstname of the submitting user',
        ColumnType.Optional
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'lastname',
        'Lastname',
        'Lastname of the submitting user',
        ColumnType.Optional
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'email',
        'Email',
        'Email address of the submitting user',
        ColumnType.Optional,
        DataType.Email
    ]
]], [
    'User data',
    'Personal information about the submitting user'
]]])
