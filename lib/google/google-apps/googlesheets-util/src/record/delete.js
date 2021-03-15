import {
    SortOrder
} from '@goldeimer/enum-lib'

import {
    RelationshipType
} from '../enum'

import {
    getSheetByName
} from '../sheet'

import {
    getColumnIndexById,
    getRowIndexAtBeginOfTableBody
} from '../table'

import {
    eq,
    neq,
    gt,
    gte,
    lt,
    lte
} from './operator'

const getLinks = (recordName) => {
    const table = TABLE_LOOKUP[recordName]

    if (!table) {
        return []
    }

    return table.links
}

const makeTest = (conditions, indices) => {
    conditions.map(({
        columnId,
        ...condition
    }) => ({
        ...condition,
        columnIndex: indices[columnId]
    }))

    return (record) => {
        let passes = true

        for (let i = 0; i < conditions.length; i += 1) {
            if (!conditions[i].compare(
                conditions[i].search,
                record[conditions[i].columnIndex]
            )) {
                passes = false
                break
            }
        }

        return passes
    }
}

const getRecordById = (
    recordName,
    {
        embed = false,
        embedShouldIncludeSecondary = false,
        where = []
    }
) => {
    if (embed) {
        const links = getLinks(recordName)

        links.forEach(({ ref, rel }) => {
            if (
                embed === true && (
                    !RelationshipType.secondary.is(rel) ||
                    embedShouldIncludeSecondary
                ) ||
                ref in embed
            ) {
                records.forEach((__, index) => {
                    records[index][getRefKey(ref, rel)] = getRecords(
                        embeddableRecordName
                    )
                })
            }
        })
    }
}

const deleteRecord = (recordName, recordId) => {
    sheet = getSheetByName(recordName)

    if (!sheet) {
        return false
    }

    sheet.deleteRow
}
