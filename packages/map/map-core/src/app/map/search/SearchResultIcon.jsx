import React from 'react'
import PropTypes from 'prop-types'

import { SearchResultType } from '../enum'
import {
    FeatureIcon,
    PropTypeColor
} from '../feature'
import {
    MarkerIcon,
    PointOfInterestIcon,
    SearchHistoryResultIcon
} from '../icon'

const SearchResultIcon = ({
    color,
    fontSize,
    iconComponent,
    type
}) => {
    switch (type) {
    case SearchResultType.FEATURE:
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

    case SearchResultType.HISTORY:
        return <SearchHistoryResultIcon fontSize={fontSize} />

    case SearchResultType.GEOCODING: // [fallthrough]
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
