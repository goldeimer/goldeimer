import {
    makeColumns
} from './factory/makeColumn'

const makeReplaceTemplateTags = (
    recordName,
    recordPluralName
) => (str) => str.replace(
    '@RECORD_NAME@',
    recordName
).replace(
    '@RECORD_PLURAL_NAME@',
    recordPluralName
)

const makeSection = (
    columns,
    [sectionTitle, sectionDescription],
    { recordName, recordPluralName },
    { columnsBefore = [], defaults = {} }
) => {
    const replaceTemplateTags = makeReplaceTemplateTags(
        recordName,
        recordPluralName
    )

    return {
        columns: [
            ...makeColumns(
                columnsBefore,
                {},
                replaceTemplateTags
            ),
            ...makeColumns(
                columns,
                defaults,
                replaceTemplateTags
            )
        ],
        sectionDescription: replaceTemplateTags(
            sectionDescription
        ),
        sectionTitle: replaceTemplateTags(
            sectionTitle
        )
    }
}

const withSection = (
    tab,
    columns,
    section,
    args = {}
) => {
    const sectionObj = makeSection(
        columns,
        section,
        tab,
        args
    )

    return {
        ...tab,
        flattenedColumns: [
            ...tab.flattenedColumns,
            ...sectionObj.columns
        ],
        sections: [
            ...tab.sections,
            sectionObj
        ]
    }
}

const withSections = (
    tab,
    sections
) => sections.forEach((
    section
) => withSection(tab, ...section))

export {
    makeSection as default,
    withSection,
    withSections
}
