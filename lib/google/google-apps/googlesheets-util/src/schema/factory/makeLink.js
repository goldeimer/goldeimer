import {
    RelationshipType
} from '../enum'

const makeLink = (tab, rel) => ({
    ref: tab.recordName,
    rel
})

const appendLink = (tab, link) => {
    /* eslint-disable-next-line no-param-reassign */
    tab.links.push(link)

    return link
}

const connectChild = (tabA, tabB) => {
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

const connectMany2Many = (tabA, tabB) => {
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

export {
    makeLink as default,
    appendLink,
    connectChild,
    connectMany2Many
}
