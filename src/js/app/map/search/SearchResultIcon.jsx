import React from 'react'
import PropTypes from 'prop-types'

import { SEARCH_RESULT_TYPE } from '@map/search'

import SearchHistoryResultIcon from '@material-ui/icons/AccessTime'

import { MarkerIcon, PointOfInterestIcon } from '@map/icons/ui'

const SearchResultIcon = ({ id, type, ...other }) => {
    switch (type) {
    case SEARCH_RESULT_TYPE.feature.value:
        return <PointOfInterestIcon {...other} />

    case SEARCH_RESULT_TYPE.history.value:
        return <SearchHistoryResultIcon {...other} />

    // case SEARCH_RESULT_TYPE.geocoding:  [fallthrough]
    default:
        return <MarkerIcon {...other} />
    }
}

SearchResultIcon.propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}

SearchResultIcon.defaultProps = {
    id: null,
    type: null
}

export default SearchResultIcon
