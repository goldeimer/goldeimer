const ID_COLUMN = [
    'id',
    'ID',
    'Unique identifier for @RECORD_NAME@'
]

const META_COLUMNS = [[
    'createdAt',
    'Created at',
    'Time of @RECORD_NAME@ creation'
], [
    'createdBy',
    'Created by',
    'The user having created the @RECORD_NAME@'
], [
    'updatedAt',
    'Updated at',
    'Time of most recent update to @RECORD_NAME@'
], [
    'updatedBy',
    'Updated by',
    'The user having most recently updated the @RECORD_NAME@'
]]

const SECTION_TEMPLATE_ESSENTIAL = [[
    'Essential',
    'Essential @RECORD_NAME@ data'
], { columnsBefore: [ID_COLUMN] }]

const SECTION_TEMPLATE_META = [META_COLUMNS, [
    'Meta',
    'Meta data about the respective individual @RECORD_NAME@ record'
]]

export {
    SECTION_TEMPLATE_ESSENTIAL,
    SECTION_TEMPLATE_META
}
