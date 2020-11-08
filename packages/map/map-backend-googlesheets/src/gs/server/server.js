import {
    handleEdit,
    handleOpen
} from '@gs/server/handleEvent'

import {
    handleGetRequest,
    handlePostRequest
} from '@gs/server/handleRequest'

import {
    updateSchema
} from '@gs/database'

import {
    dispatchToast,
    openRecordEditor,
    RecordOperation
} from '@gs/server/ui'

import {
    getUserCrudOperationProperties,
    setUserCrudOperationProperties,
    unsetUserCrudOperationProperties
} from '@gs/server/userProperties'

// event handlers
global.onEdit = handleEdit
global.onOpen = handleOpen

// HTTP request handlers
global.doGet = handleGetRequest
global.doPost = handlePostRequest

// UI
global.dispatchToast = dispatchToast
global.openRecordEditor = openRecordEditor
global.RecordOperation = RecordOperation

// initialize or update the database
global.updateSchema = updateSchema

// user properties
global.getUserCrudOperationProperties = getUserCrudOperationProperties
global.setUserCrudOperationProperties = setUserCrudOperationProperties
global.unsetUserCrudOperationProperties = unsetUserCrudOperationProperties
