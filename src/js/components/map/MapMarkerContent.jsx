import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import MarkerIcon from '@material-ui/icons/Room'

import useHover from 'hooks/useHover'

import ArrowPopper from 'components/ArrowPopper'
import MapMarkerDetailCard from 'components/map/MapMarkerDetailCard'

const useStyles = makeStyles((theme) => ({
    popperTrigger: {
        cursor: 'pointer',
        // One below the lowest elevated element of material-ui.
        // Effectively `999`.
        zIndex: theme.zIndex.mobileStepper - 1
    },
    popper: {
        zIndex: theme.zIndex.tooltip
    }
}))

const MapMarkerContent = ({
    component: Component,
    placeName,
    uuid,
    ...componentProps
}) => {
    // TODO:
    // Employ uuid to fetch detail data.

    const {
        bind,
        currentTriggerEl,
        isHovered
    } = useHover()

    const classes = useStyles()

    return (
        <>
            <ArrowPopper
                anchorEl={currentTriggerEl}
                className={classes.popper}
                isOpen={isHovered}
            >
                <MapMarkerDetailCard
                    placeName={placeName}
                />
            </ArrowPopper>
            <Component
                {...bind}
                {...componentProps}
                className={classes.popperTrigger}
                uuid={uuid}
            />
        </>
    )
}

MapMarkerContent.propTypes = {
    component: PropTypes.elementType,
    placeName: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired
}

MapMarkerContent.defaultProps = {
    component: MarkerIcon
}

export default MapMarkerContent
