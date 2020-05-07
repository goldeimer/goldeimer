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
    onSelect: PropTypes.func
}

export default propTypesSelectionList
