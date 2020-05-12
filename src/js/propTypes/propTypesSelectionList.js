import PropTypes from 'prop-types'

const propTypesSelectionList = {
    dense: PropTypes.bool,
    itemIcon: PropTypes.node,
    items: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string,
            value: PropTypes.any
        })
    ),
    noOptionsText: PropTypes.string,
    onSelect: PropTypes.func,
    onSubmit: PropTypes.func
}

const defaultPropsSelectionList = {
    dense: true,
    itemIcon: null,
    noOptionsText: 'Keine Ergebnisse.',
    onSelect: null,
    onSubmit: null
}

export {
    propTypesSelectionList as default,
    defaultPropsSelectionList
}
