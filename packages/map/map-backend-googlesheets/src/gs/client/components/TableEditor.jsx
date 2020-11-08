import React, { useEffect, useState } from 'react'

import Autocomplete from '@material-ui/lab/Autocomplete'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Radio'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import {
    TABLES
} from '@gs/database'

import {
    COLUMN_TYPE,
    CRUD_OPERATION,
    DATA_TYPE,
    TABLE_TYPE,
    crudOperationKeyToName,
    crudOperationValueToName
} from '@gs/enum'

import {
    validateForm,
    validateValue
} from '@gs/validation'

import GsServer from '@gs/client/GsServer'

const handleError = async (
    error,
    message = null
) => {
    try {
        console.log(
            JSON.stringify({
                error,
                message
            })
        )

        await GsServer.dispatchToast(
            message || JSON.stringify(error)
        )
    } catch {
        // pass
    }
}

const dataTypeToInputType = (dataType) => {
    switch (dataType) {
        case DATA_TYPE.color:
            return 'color'

        case DATA_TYPE.date:
            return 'date'

        case DATA_TYPE.email:
            return 'email'

        case DATA_TYPE.file:
            return 'file'

        case DATA_TYPE.month:
            return 'month'

        case DATA_TYPE.number:
            return 'number'

        case DATA_TYPE.password:
            return 'password'

        case DATA_TYPE.phone:
            return 'tel'

        case DATA_TYPE.time:
            return 'time'

        case DATA_TYPE.url:
            return 'url'

        case DATA_TYPE.week:
            return 'week'

        default:
            return 'text'
    }
}

const DEFAULT_STATE = {
    crudOperation: CRUD_OPERATION.create.value,
    formState: {},
    hasChanges: false,
    record: null,
    records: null,
    table: {}
}

const TableEditor = () => {
    // database state
    const [record, setRecord] = useState(DEFAULT_STATE.record)
    const [records, setRecords] = useState(DEFAULT_STATE.records)
    const [table, setTable] = useState(DEFAULT_STATE.table)

    // form state
    const [formState, setFormState] = useState(DEFAULT_STATE.formState)
    const [hasChanges, setHasChanges] = useState(DEFAULT_STATE.hasChanges)

    // type of operation / form
    const [crudOperation, setCrudOperation] = useState(
        DEFAULT_STATE.crudOperation
    )

    const {
        flattenedColumns,
        recordName,
        tableName
    } = table

    const recordDisplayName = record && record.name
        ? record.name
        : recordName

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const {
                    currentCrudOperation,
                    currentTableName
                } = await GsServer.getUserCrudOperationProperties()

                handleTableNameChangeByValue(currentTableName, false)
                setCrudOperation(currentCrudOperation)
            } catch (error) {
                handleError(error)
            }
        }

        const fetchRecords = async () => {
            try {
                const receivedRecords = await GsServer.getTableRecords()

                setRecords(receivedRecords)
            } catch (error) {
                handleError(
                    error,
                    'Failed to fetch records'
                )
            }
        }

        fetchProperties()
        fetchRecords()
    }, [])

    useEffect(() => {
        setHasChanges(DEFAULT_STATE.hasChanges)

        if (!record) {
            setFormState(DEFAULT_STATE.formState)
        }

        const validationResult = validateAll(record)

        const newFormState = flattenedColumns.reduce((acc, {
            columnId,
            defaultValue
        }) => ({
            ...acc,
            [columnId]: {
                ...(formState[columnId] || {}),
                errors: validationResult[columnId],
                value: record[columnId] || defaultValue
            }
        }), { ...formState })

        setFormState(newFormState)
    }, [record])

    const setProperties = async (properties = {}) => {
        try {
            await GsServer.setUserCrudOperationProperties(properties)
        } catch (error) {
            console.log(error)
        }
    }

    const validateAll = (
        recordArg = null
    ) => validateForm(
        flattenedColumns.map(({
            columnId,
            dataType,
            defaultValue,
            validations
        }) => {
            const fallback = defaultValue || ''

            return {
                dataType,
                defaultValue,
                fieldId: columnId,
                validations,
                value: recordArg
                    ? recordArg[columnId] || fallback
                    : (formState[columnId] || {}).value || fallback
            }
        })
    )

    const handleInputChange = (event) => {
        const columnId = event.target.name
        const { value } = event.target

        const errors = validateValue(value)

        setFormState({
            ...formState,
            [columnId]: {
                value,
                errors
            }
        })

        if (!hasChanges) {
            setHasChanges(true)
        }
    }

    const handleFormSubmit = async () => {
        // server-side only?
        if (!(validateAll().isValid)) {
            return
        }

        try {
            await GsServer.submitRecordForm(
                Object.fromEntries(Object.entries(formState).map(([
                    columnId,
                    { value }
                ]) => [columnId, value]))
            )

            await GsServer.dispatchToast(
                `'${recordDisplayName}' saved!`
            )
        } catch (error) {
            handleError(
                error,
                `Failed to ${crudOperationValueToName(crudOperation)} '${recordDisplayName}'`
            )
        }
    }

    const handleCrudOperationChange = (event) => {
        const newCrudOperation = CRUD_OPERATION.isDefined(
            event.target.value
        ) ? CRUD_OPERATION.get(event.target.value)
            : undefined

        if (!newCrudOperation) {
            handleError(
                null,
                'Failed to set form to chosen operation'
            )

            return
        }

        setCrudOperation(newCrudOperation)
        setProperties({
            currentCrudOperation: newCrudOperation
        })
    }

    const handleRecordIdChange = (event) => {
        const newRecord = records.find(
            (thisRecord) => thisRecord.id === event.target.value
        )

        if (!newRecord) {
            handleError(
                null,
                'Failed to find chosen record'
            )

            return
        }

        setRecord(newRecord)
    }

    const handleTableNameChangeByValue = (
        tableName,
        shouldSetProperties = true
    ) => {
        const newTable = TABLE_LOOKUP[tableName]

        if (!newTable) {
            handleError(
                null,
                'Failed to find chosen table'
            )

            return
        }

        setTable(newTable)

        if (shouldSetProperties) {
            setProperties({
                currentTableName: newTable.tableName
            })
        }
    }

    const handleTableNameChange = (event) => {
        handleTableNameChangeByValue(event.target.value)
    }

    return (
        <>
            <Typography component='h1' variant='h6'>
                {`${crudOperationValueToName(crudOperation)} ${recordDisplayName}`}
            </Typography>
            <Box>
                <TextField
                    label='Operation'
                    onChange={handleCrudOperationChange}
                    select
                    variant='filled'
                >
                    {
                        CRUD_OPERATION.enums.map(({
                            key,
                            value
                        }) => (
                            <MenuItem
                                name={key}
                                key={value}
                                value={value}
                                selected={value === crudOperation}
                            >
                                {crudOperationKeyToName(key)}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    label='Record'
                    onChange={handleRecordNameChange}
                    select
                    variant='filled'
                >
                    {
                        TABLES.map(({
                            thisRecordName,
                            tableType
                        }) => (
                            tableType !== TABLE_TYPE.singleRow
                                ? (
                                    <MenuItem
                                        key={thisRecordName}
                                        value={thisRecordName}
                                        selected={thisRecordName === recordName}
                                    >
                                        {thisRecordName}
                                    </MenuItem>
                                ) : null
                        ))
                    }
                </TextField>
                {records && (
                    <Autocomplete
                        options={records}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={
                            (option, value) => option.id === value.id
                        }
                        onChange={(_, value) => setRecord(value)}
                        style={{ width: 200 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={recordName}
                                variant='filled'
                            />
                        )}
                    />
                )}
            </Box>
            {table && (
                <Box>
                    <Divider />
                    {table.sections.map(({
                        columns,
                        section: { sectionDescription, sectionTitle }
                    }) => columns.map(({
                        columnId,
                        columnName,
                        columnType,
                        dataType,
                        defaultValue
                    }) => {
                        const isDisabled = columnType === COLUMN_TYPE.auto
                        const isHidden = isDisabled
                        const isRequired = columnType === COLUMN_TYPE.required

                        switch (dataType) {
                            case DATA_TYPE.bool:
                                return (
                                    <Switch
                                        checked={defaultValue}
                                        disabled={isDisabled}
                                    />
                                )

                            case DATA_TYPE.enum:
                                return (
                                    <Select
                                        disabled={isDisabled}
                                    />
                                )

                            case DATA_TYPE.foreignKey:
                                return null

                            case DATA_TYPE.icon:
                                return null

                            default:
                                return (
                                    <TextField
                                        defaultValue={defaultValue}
                                        disabled={isDisabled}
                                        id={columnId}
                                        label={columnName}
                                        required={isRequired}
                                        type={dataTypeToInputType(dataType)}
                                        variant='filled'
                                    />
                                )
                        }
                    }))}
                </Box>
            )}
        </>
    )
}

export default TableEditor
