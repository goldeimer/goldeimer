import {
    RELATIONSHIP_TYPE
} from '@gs/enum'

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
            RELATIONSHIP_TYPE.child.key
        )
    )

    return appendLink(
        tabB,
        makeLink(
            tabB,
            RELATIONSHIP_TYPE.parent.key
        )
    )
}

const connectMany2Many = (tabA, tabB) => {
    appendLink(
        tabA,
        makeLink(
            tabB,
            RELATIONSHIP_TYPE.secondary.key
        )
    )

    appendLink(
        tabB,
        makeLink(
            tabA,
            RELATIONSHIP_TYPE.primary.key
        )
    )
}

export {
    makeLink as default,
    appendLink,
    connectChild,
    connectMany2Many
}
