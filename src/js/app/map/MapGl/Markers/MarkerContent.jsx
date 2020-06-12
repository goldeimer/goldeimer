import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import { useDetail } from '@map/features'

import useHover from '@lib/hooks/useHover'

import ArrowPopper from '@lib/components/modals/ArrowPopper'
import Box from '@material-ui/core/Box'

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

const MarkerContent = forwardRef(({
    component: Component,
    renderDetailCard,
    id,
    ...componentProps
}, ref) => {
    const {
        bind,
        currentTriggerEl,
        isHovered
    } = useHover()

    const detail = useDetail(id)

    const classes = useStyles()

    return (
        <>
            {renderDetailCard && (
                <ArrowPopper
                    anchorEl={currentTriggerEl}
                    className={classes.popper}
                    isOpen={isHovered}
                >
                    {renderDetailCard(detail)}
                </ArrowPopper>
            )}
            <Box
                {...bind}
                display='inline-block'
                ref={ref}
            >
                <Component
                    {...componentProps}
                    className={clsx({
                        [classes.popperTrigger]: renderDetailCard !== null
                    })}
                    id={id}
                />
            </Box>
        </>
    )
})

MarkerContent.propTypes = {
    component: PropTypes.elementType,
    id: PropTypes.string.isRequired,
    renderDetailCard: PropTypes.func
}

MarkerContent.defaultProps = {
    component: MarkerIcon,
    renderDetailCard: null
}

export default MarkerContent
