import React, { forwardRef, useRef, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { useForkRef } from '@material-ui/core/utils'
import Box from '@material-ui/core/Box'

import { ArrowPopper } from '@goldeimer/react-components'
import {
    useCallback,
    useHover
} from '@goldeimer/react-util'

import {
    detailToFeatureContext,
    useDetail
} from '../../feature'
import { MarkerIcon } from '../../icon'

const useStyles = makeStyles(({ zIndex }) => ({
    popperTrigger: {
        cursor: 'pointer',
        zIndex: zIndex.mobileStepper - 100
    },
    popper: {
        zIndex: zIndex.mobileStepper - 50
    }
}))

const MarkerContent = ({
    component: Component,
    detailPopperComponent: DetailPopperComponent,
    highlightId,
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
        isDetailEnabled
        && DetailPopperComponent
        && dynamicDetail
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
                    highlightId={highlightId}
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
}

MarkerContent.propTypes = {
    component: PropTypes.elementType,
    highlightId: PropTypes.string,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    detailPopperComponent: PropTypes.elementType
}

MarkerContent.defaultProps = {
    component: MarkerIcon,
    detailPopperComponent: null,
    highlightId: null,
    id: null
}

export default forwardRef(MarkerContent)
