import React, { forwardRef, useRef, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { useForkRef } from '@material-ui/core/utils'

import useCallback from '@lib/hooks/useCallback'
import useHover from '@lib/hooks/useHover'

import {
    detailToFeatureContext,
    useDetail
} from '@map/features'

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

    const nodeRef = useRef()
    const handleRef = useForkRef(ref, nodeRef)

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

    const handleDetailsReceived = useCallback(
        (details) => {
            setDynamicDetail(details)
        }, []
    )

    return (
        <>
            {shouldRenderDetail && (
                <ArrowPopper
                    anchorEl={
                        nodeRef.current
                            ? nodeRef.current
                            : currentTriggerEl
                    }
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
                    ref={handleRef}
                    onDetailsReceived={handleDetailsReceived}
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
