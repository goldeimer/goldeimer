import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import MarkerIcon from '@material-ui/icons/Room'

import useHover from '@lib/hooks/useHover'

import ArrowPopper from '@lib/components/modals/ArrowPopper'

import MarkerDetailCard from '@map/MapGl/Markers/MarkerDetailCard'

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

const MarkerContent = ({
    component: Component,
    placeName,
    id,
    ...componentProps
}) => {
    // TODO:
    // Employ id to fetch detail data.

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
                <MarkerDetailCard
                    placeName={placeName}
                />
            </ArrowPopper>
            <Component
                {...bind}
                {...componentProps}
                className={classes.popperTrigger}
                id={id}
            />
        </>
    )
}

MarkerContent.propTypes = {
    component: PropTypes.elementType,
    id: PropTypes.string.isRequired,
    placeName: PropTypes.string.isRequired
}

MarkerContent.defaultProps = {
    component: MarkerIcon
}

export default MarkerContent
