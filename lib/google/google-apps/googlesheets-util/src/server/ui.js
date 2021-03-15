import {
    UI_TITLE
} from '@gs/config'

import {
    CrudOperation,
    TableType
} from '../enum'

import {
    TABLE_LOOKUP,
    TABLES
} from '@gs/schema'

import {
    getActiveSpreadsheet,
    setActiveSheet
} from '@gs/sheet'

import {
    pascalCase
} from '@gs/util'

import {
    createHtmlOutputFromFile
} from '@gs/server/gsService'

import {
    getUi
} from '@gs/server/gsApp'

import {
    setUserCrudOperationProperties
} from '@gs/server/userCrudOperation'

const createMenu = (name) => getUi().createMenu(name)

const dispatchToast = (msg) => getActiveSpreadsheet().toast(msg)

const openRecordEditor = () => {
    getUi().showSidebar(
        createHtmlOutputFromFile()
            .setTitle(UI_TITLE)
    )
}

const RecordOperation = {}

TABLES.forEach(({
    recordName,
    tableName
}) => {
    const methodSuffix = pascalCase(recordName)

    RecordOperation[`add${methodSuffix}`] = () => {
        setUserCrudOperationProperties({
            currentCrudOperation: CrudOperation.create.value,
            currentTableName: tableName
        })
        openRecordEditor()
    }

    RecordOperation[`edit${methodSuffix}`] = () => {
        setUserCrudOperationProperties({
            currentCrudOperation: CrudOperation.update.value,
            currentTableName: tableName
        })
        openRecordEditor()
    }

    RecordOperation[`open${tableName}Table`] = () => {
        setActiveSheet(tableName)
    }
})

const addAddEditSubMenu = (
    menu,
    tableName,
    recordName
) => {
    const methodSuffix = pascalCase(recordName)
    menu.addSubMenu(createMenu(tableName)
        .addItem(`Add new ${recordName}`, `RecordOperation.add${methodSuffix}`)
        .addItem(`Edit ${recordName}`, `RecordOperation.edit${methodSuffix}`))
}

const addEditItem = (
    menu,
    label,
    recordName
) => {
    const methodSuffix = pascalCase(recordName)
    menu.addItem(label, `RecordOperation.edit${methodSuffix}`)
}

const addAddSetActiveSheetItem = (
    menu,
    label,
    tableName
) => {
    menu.addItem(label, `RecordOperation.open${tableName}Table`)
}

const initializeUi = () => {
    const menu = createMenu(UI_TITLE)

    TABLE_LOOKUP[TableType.Default.value].forEach(({
        recordName,
        tableName
    }) => addAddEditSubMenu(
        menu,
        tableName,
        recordName
    ))

    const configSingleTables = TABLE_LOOKUP[TableType.ConfigSingle.value]
    const configMultipleTables = TABLE_LOOKUP[TableType.ConfigMultiple.value]

    if (configSingleTables || configMultipleTables) {
        menu.addSeparator()

        configSingleTables.forEach(({
            recordName,
            tableName
        }) => addEditItem = (
            menu,
            tableName,
            recordName
        ))

        configMultipleTables.forEach(({
            recordName,
            tableName
        }) => addAddEditSubMenu(
            menu,
            tableName,
            recordName
        ))
    }

    const logTables = TABLE_LOOKUP[TableType.Log.value]
    const queueTables = TABLE_LOOKUP[TableType.Queue.value]

    if (logTables || queueTables) {
        menu.addSeparator()

        queueTables.forEach(({
            recordName,
            tableName
        }) => addEditItem = (
            menu,
            tableName,
            recordName
        ))

        logTables.forEach(({
            tableName
        }) => addAddSetActiveSheetItem(
            menu,
            tableName
        ))
    }

    menu.addSeparator()

    TABLE_LOOKUP[TableType.Meta.value].forEach(({
        tableName
    }) => addAddSetActiveSheetItem(
        menu,
        tableName
    ))

    menu.addItem('Update database schema', 'updateSchema')
        .addToUi()
}

export {
    createMenu,
    dispatchToast,
    initializeUi,
    openRecordEditor,
    RecordOperation
}
