import {
    ORDER
} from '@lib/enum'

import {
    getSheetByName
} from '@gs/sheet'

import {
    getColumnIds,
    getRowIndexAtBeginOfTableBody
} from '@gs/table'

import {
    eq
} from '@gs/record/operator'

const select = (selectedColumnIds = []) => {
    const state = {
        columnIds: [],
        condition: null,
        joins: [],
        order: ORDER.asc,
        orderBy: null,
        recordName: '',
        records: []
    }

    const methods = {}

    const getRecords = (method = 'values') => {
        if (!state.recordName) {
            return []
        }

        // Acquire lock?

        const sheet = getSheetByName(state.recordName)

        if (!sheet) {
            return []
        }

        const rowIndexAtBeginOfTableBody = getRowIndexAtBeginOfTableBody(
            sheet
        )

        state.columnIds = getColumnIds(sheet)

        if (state.condition || state.joins.length) {
            state.records = state.records.reduce((acc, record, index) => {
                if (
                    index < rowIndexAtBeginOfTableBody || (
                        state.condition &&
                        !state.condition(record, state.columnIds)
                    )
                ) {
                    return acc
                }

                const values = selectedColumnIds
                    ? selectedColumnIds.map(
                        (columnId) => record[
                            state.columnIds.indexOf(columnId)
                        ]
                    )
                    : record

                return [
                    ...acc,
                    [
                        index,
                        ...values,
                        ...state.joins.map(
                            (join) => join.selection.where(
                                eq(
                                    `${state.recordName}Id`,
                                    record[state.columnIds.indexOf('id')]
                                )
                            )
                        )
                    ]
                ]
            }, [])
        }

        if (state.orderBy) {
            const columnIndex = state.columnIds.indexOf(state.orderBy)

            if (columnIndex) {
                const isAsc = state.order === ORDER.asc
                const ifLess = isAsc ? -1 : 1
                const ifMore = -1 * ifLess

                state.records = state.records.sort((
                    recordA,
                    recordB
                ) => {
                    const valueA = recordA[columnIndex]
                    const valueB = recordB[columnIndex]

                    return valueA < valueB
                        ? ifLess
                        : valueA > valueB
                            ? ifMore
                            : 0
                })
            }
        }

        return state.records
    }

    methods.from = (name) => {
        state.recordName = name

        return methods
    }

    methods.where = (condition) => {
        state.conditions = condition

        return methods
    }

    methods.orderBy = (columnId) => {
        state.orderBy = columnId

        const asc = () => {
            state.order = ORDER.asc

            return methods
        }

        const desc = () => {
            state.order = ORDER.desc

            return methods
        }

        return {
            ...methods,
            asc,
            desc
        }
    }

    methods.join = (
        joinRecordName,
        joinColumnIds = []
    ) => {
        const joinedSelection = select(
            joinColumnIds
        ).from(
            joinRecordName
        )

        state.joins.push(joinedSelection)

        return methods
    }

    methods.values = () => getRecords()

    methods.objects = () => {
        const records = getRecords('objects')

        return transpose(
            records,
            selectedColumnIds || columnIds
        )
    }

    return methods
}

export default select
