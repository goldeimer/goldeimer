import {
    RelationshipType
} from '@goldeimer/data-util'

export const makeLink = (tab, rel) => ({
    ref: tab.recordName,
    rel
})

export const appendLink = (tab, link) => {
    /* eslint-disable-next-line no-param-reassign */
    tab.links.push(link)

    return link
}

export const connectChild = (tabA, tabB) => {
    appendLink(
        tabA,
        makeLink(
            tabB,
            RelationshipType.child.key
        )
    )

    return appendLink(
        tabB,
        makeLink(
            tabB,
            RelationshipType.parent.key
        )
    )
}

export const connectMany2Many = (tabA, tabB) => {
    appendLink(
        tabA,
        makeLink(
            tabB,
            RelationshipType.secondary.key
        )
    )

    appendLink(
        tabB,
        makeLink(
            tabA,
            RelationshipType.primary.key
        )
    )
}
