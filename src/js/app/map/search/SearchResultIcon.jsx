import React from 'react'
import PropTypes from 'prop-types'

import { FeatureIcon, PropTypeColor } from '@map/features'
import { SEARCH_RESULT_TYPE } from '@map/search'

import {
    MarkerIcon,
    PointOfInterestIcon,
    SearchHistoryResultIcon
} from '@map/icons'

const SearchResultIcon = ({
    color,
    fontSize,
    iconComponent,
    type
}) => {
    switch (type) {
    case SEARCH_RESULT_TYPE.feature.value:
        if (iconComponent) {
            return (
                <FeatureIcon
                    color={color}
                    component={iconComponent}
                    fontSize={fontSize}
                />
            )
        }

        return <PointOfInterestIcon fontSize={fontSize} />

    case SEARCH_RESULT_TYPE.history.value:
        return <SearchHistoryResultIcon fontSize={fontSize} />

    // case SEARCH_RESULT_TYPE.geocoding:  [fallthrough]
    default:
        return <MarkerIcon fontSize={fontSize} />
    }
}

SearchResultIcon.propTypes = {
    color: PropTypeColor,
    fontSize: PropTypes.string,
    iconComponent: PropTypes.elementType,
    type: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}

SearchResultIcon.defaultProps = {
    color: null,
    fontSize: 'default',
    iconComponent: null,
    type: null
}

export default SearchResultIcon
