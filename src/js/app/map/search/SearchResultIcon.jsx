import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { PropTypeColor } from '@map/features'
import { SEARCH_RESULT_TYPE } from '@map/search'

import SearchHistoryResultIcon from '@material-ui/icons/AccessTime'

import { MarkerIcon, PointOfInterestIcon } from '@map/icons/ui'

const useStyles = makeStyles(({
    palette,
    shape: { borderRadius }
}) => ({
    featureIcon: ({ color }) => {
        const backgroundColor = color ? color.main : palette.grey[600]
        const iconColor = color ? color.contrastText : palette.common.white

        return {
            backgroundColor,
            borderRadius,
            color: iconColor
        }
    }
}))

const SearchResultIcon = ({
    color,
    fontSize,
    iconComponent: IconComponent,
    type
}) => {
    const classes = useStyles({ color })

    switch (type) {
    case SEARCH_RESULT_TYPE.feature.value:
        if (IconComponent) {
            return (
                <IconComponent
                    className={classes.featureIcon}
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
