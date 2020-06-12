import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { useDetail } from '@map/features'

import useHover from '@lib/hooks/useHover'

import ArrowPopper from '@lib/components/modals/ArrowPopper'
import MarkerDetailCard from '@map/MapGl/Markers/MarkerDetailCard'

import { MarkerIcon } from '@map/icons/ui'

const useStyles = makeStyles(({ zIndex }) => ({
    popperTrigger: {
        cursor: 'pointer',
        // One below the lowest elevated element of material-ui.
        // Effectively `999`.
        zIndex: zIndex.mobileStepper - 1
    },
    popper: {
        zIndex: zIndex.tooltip
    }
}))

const MarkerContent = ({
    component: Component,
    placeName,
    id,
    ...componentProps
}) => {
    const {
        bind,
        currentTriggerEl,
        isHovered
    } = useHover()

    const feature = useDetail(id)

    const classes = useStyles()

    return (
        <>
            <ArrowPopper
                anchorEl={currentTriggerEl}
                className={classes.popper}
                isOpen={isHovered}
            >
                <MarkerDetailCard
                    {...feature}
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
