import {
    handleEdit,
    handleOpen
} from './handleEvent'

import {
    handleGetRequest,
    handlePostRequest
} from './handleRequest'

import {
    updateSchema
} from './database'

import {
    dispatchToast,
    openRecordEditor,
    RecordOperation
} from './ui'

import {
    getUserCrudOperationProperties,
    setUserCrudOperationProperties,
    unsetUserCrudOperationProperties
} from './userProperties'

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
