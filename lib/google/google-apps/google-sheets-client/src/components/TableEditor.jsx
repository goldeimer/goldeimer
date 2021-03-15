import React, {
    useCallback,
    useEffect,
    useState
} from 'react'

import Autocomplete from '@material-ui/lab/Autocomplete'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Radio'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import {
    dataType2HtmlElement,
    validateForm,
    validateValue,
    ColumnType,
    CrudOperation,
    DataType,
    TableType
} from '@goldeimer/data-util'

import { getKey } from '@goldeimer/enum'

import GsServer from '../GsServer'

const handleError = async (
    error,
    message = null
) => {
    try {
        console.error(
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

const DEFAULT_STATE = {
    crudOperation: CrudOperation.create.value,
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
        recordName
    } = table

    const recordDisplayName = record && record.name
        ? record.name
        : recordName

    const setProperties = async (properties = {}) => {
        try {
            await GsServer.setUserCrudOperationProperties(properties)
        } catch (error) {
            console.log(error)
        }
    }

    const validateAll = useCallback((
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
    ), [flattenedColumns, formState])

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
                `Failed to ${getKey(crudOperation)} '${recordDisplayName}'`
            )
        }
    }

    const handleCrudOperationChange = (event) => {
        const newCrudOperation = Object.keys(CrudOperation).includes(
            event.target.value
        )
            ? event.target.value
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

    const handleTableNameChangeByValue = useCallback((
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
    }, [])

    const handleTableNameChange = (event) => {
        handleTableNameChangeByValue(event.target.value)
    }

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
    }, [flattenedColumns, formState, record, validateAll])

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
    }, [handleTableNameChangeByValue])

    return (
        <>
            <Typography component="h1" variant="h6">
                {`${getKey(crudOperation)} ${recordDisplayName}`}
            </Typography>
            <Box>
                <TextField
                    label="Operation"
                    onChange={handleCrudOperationChange}
                    select
                    variant="filled"
                >
                    {
                        CrudOperation.enums.map(({
                            key,
                            value
                        }) => (
                            <MenuItem
                                name={key}
                                key={value}
                                value={value}
                                selected={value === crudOperation}
                            >
                                {key}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    label="Record"
                    onChange={handleRecordIdChange}
                    select
                    variant="filled"
                >
                    {
                        TABLES.map(({
                            thisRecordName,
                            tableType
                        }) => (
                            tableType !== TableType.singleRow
                                ? (
                                    <MenuItem
                                        key={thisRecordName}
                                        value={thisRecordName}
                                        selected={thisRecordName === recordName}
                                    >
                                        {thisRecordName}
                                    </MenuItem>
                                )
                                : null
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
                                variant="filled"
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
                        const isDisabled = columnType === ColumnType.auto
                        // const isHidden = isDisabled
                        const isRequired = columnType === ColumnType.required

                        switch (dataType) {
                        case DataType.Bool:
                            return (
                                <Switch
                                    checked={defaultValue}
                                    disabled={isDisabled}
                                />
                            )

                        case DataType.Enum:
                            return (
                                <Select
                                    disabled={isDisabled}
                                />
                            )

                        case DataType.ForeignKey:
                            return null

                        case DataType.Icon:
                            return null

                        default:
                            return (
                                <TextField
                                    defaultValue={defaultValue}
                                    disabled={isDisabled}
                                    id={columnId}
                                    label={columnName}
                                    required={isRequired}
                                    type={dataType2HtmlElement(dataType)}
                                    variant="filled"
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
