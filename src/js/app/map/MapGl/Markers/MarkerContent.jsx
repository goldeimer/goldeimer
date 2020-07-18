import React, { forwardRef, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import { detailToFeatureContext, useDetail } from '@map/features'

import useHover from '@lib/hooks/useHover'

import ArrowPopper from '@lib/components/modals/ArrowPopper'
import Box from '@material-ui/core/Box'

import { MarkerIcon } from '@map/icons'

const useStyles = makeStyles(({ zIndex }) => ({
    popperTrigger: {
        cursor: 'pointer',
        zIndex: zIndex.mobileStepper - 100
    },
    popper: {
        zIndex: zIndex.mobileStepper - 50
    }
}))

const MarkerContent = forwardRef(({
    component: Component,
    detailPopperComponent: DetailPopperComponent,
    id,
    ...componentProps
}, ref) => {
    const classes = useStyles()

    const {
        bind,
        currentTriggerEl,
        isHovered
    } = useHover()

    const [isDetailEnabled, setIsDetailEnabled] = useState(true)

    const staticDetail = useDetail(id)
    const [dynamicDetail, setDynamicDetail] = useState(staticDetail)

    const shouldRenderDetail = (
        isDetailEnabled &&
        DetailPopperComponent &&
        dynamicDetail
    )

    return (
        <>
            {shouldRenderDetail && (
                <ArrowPopper
                    anchorEl={currentTriggerEl}
                    className={classes.popper}
                    isOpen={isHovered}
                >
                    <DetailPopperComponent
                        {...componentProps}
                        {...dynamicDetail}
                    />
                </ArrowPopper>
            )}
            <Box {...bind}>
                <Component
                    {...componentProps}
                    className={clsx({
                        [classes.popperTrigger]: shouldRenderDetail
                    })}
                    id={id}
                    ref={ref}
                    onDetailsReceived={setDynamicDetail}
                    setIsDetailEnabled={setIsDetailEnabled}
                    thisContext={
                        dynamicDetail
                            ? detailToFeatureContext(dynamicDetail)
                            : null
                    }
                />
            </Box>
        </>
    )
})

MarkerContent.propTypes = {
    component: PropTypes.elementType,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    detailPopperComponent: PropTypes.elementType
}

MarkerContent.defaultProps = {
    component: MarkerIcon,
    detailPopperComponent: null,
    id: null
}

export default MarkerContent
