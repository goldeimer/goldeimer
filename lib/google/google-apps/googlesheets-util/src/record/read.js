const { select } = require('d3-selection')

const getLinks = (recordName) => {
    const table = TABLE_LOOKUP[recordName]

    if (!table) {
        return []
    }

    return table.links
}

const getRecordById = (
    recordName,
    {
        embed = false,
        embedShouldIncludeSecondary = false
    }
) => {
    select().from(recordName)
        .where('id')

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

const transpose = (sheetValues, columns) => {
    if (sheetValues.length > tableHeaderRowsLength) {
        const columnIds = sheetValues[0]

        const records = sheetValues.slice(tableHeaderRowsLength)

        return records.map((
            record
        ) => columns.reduce((acc, { columnId, defaultValue }) => {
            const columnIndex = columnIds.findIndex(
                (thisColumnId) => thisColumnId === columnId
            )
            const recordValue = columnIndex !== -1
                ? record[columnIndex]
                : undefined

            const value = recordValue !== undefined
                ? recordValue
                : defaultValue

            return {
                ...acc,
                [columnId]: value
            }
        }, {}))
    }

    return []
}
