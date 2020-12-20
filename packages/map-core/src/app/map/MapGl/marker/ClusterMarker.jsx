import React, {
    forwardRef,
    memo,
    useCallback,
    useRef,
    useEffect,
    useState
} from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { scaleLog as d3ScaleLog } from 'd3-scale'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useForkRef } from '@material-ui/core/utils'

import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import { useMemo } from '@goldeimer/react-util'

import { DonutChart } from '@goldeimer/react-components'

import { getColorByTermId } from '../../config/taxonomies'
import { PropTypeContextInfo } from '../../context'
import { ContextType } from '../../enum'
import FEATURE from '../../feature'
import VIEW from '../../view'

import ClusterMarkerDetailCard
    from './ClusterMarkerDetailCard'
// TODO(Johannes):
// Use or remove.
// import FeatureMarkerTransition from './FeatureMarkerTransition'
import Marker, { ANCHOR_TO } from './Marker'
import PropTypeParentClusterOrigin
    from './PropTypeParentClusterOrigin'
import PropTypePointCount from './PropTypePointCount'

const makeScale = (domain, range) => (
    d3ScaleLog().domain(domain).range(range)
)

const useStyles = makeStyles(({ palette }) => ({
    root: {
        color: palette.primary.main
    },
    background: {
        borderRadius: '50%',
        backgroundColor: palette.primary.main,
        '$root:hover &': {
            backgroundColor: palette.primary.dark
        },
        '&-currentContext': {
            backgroundColor: palette.primary.dark
        },
        '&-currentHighlight': {
            backgroundColor: palette.primary.light
        }
    },
    pointCount: {
        display: 'block',
        color: palette.primary.contrastText,
        lineHeight: 1,
        marginTop: 1,
        marginLeft: 1,
        fontSize: '0.75rem',
        fontWeight: 700
    }
}), { name: 'ClusterMarker' })

const ClusterMarkerComponent = forwardRef(({
    contextInfo,
    domain,
    getSource,
    highlightId,
    id,
    latitude,
    longitude,
    onDetailsReceived,
    pointCount,
    parentClusterOrigin,
    setIsDetailEnabled
}, ref) => {
    const nodeRef = useRef(null)
    const handleRef = useForkRef(ref, nodeRef)

    const [isCurrentContext, setIsCurrentContext] = useState(false)
    const [clusterExpansionZoom, setClusterExpansionZoom] = useState(null)
    const [clusterChildren, setClusterChildren] = useState(null)

    const dispatch = useDispatch()
    const source = getSource()

    const strokeWidth = 2
    const classes = useStyles({ rootPadding: strokeWidth })
    const { palette, spacing } = useTheme()

    const range = useMemo(() => [
        spacing(5),
        spacing(8.5)
    ], [spacing])
    const scale = useMemo(() => makeScale(
        domain,
        range
    ), [domain, range])

    const radius = (
        domain
            ? Math.ceil(scale(pointCount.total))
            : (range[1] - (range[1] - range[0]))
    ) / 2

    const donutData = Object.entries(
        pointCount.secondary
    ).reduce((acc, [k, v]) => {
        if (k === 'total') {
            return acc
        }

        return {
            ...acc,
            [k]: v.total
        }
    }, {})

    const isCurrentHightlight = highlightId === id

    const handleClick = useCallback(
        () => {
            setIsDetailEnabled(false)

            let actions = []
            if (clusterChildren) {
                const rect = nodeRef.current.getBoundingClientRect()

                actions = [
                    FEATURE.view.removeCluster(id),
                    FEATURE.view.push(clusterChildren.map((feature) => ({
                        ...feature,
                        parentClusterOrigin: {
                            latitude,
                            longitude,
                            x: rect.x + rect.width / 2,
                            y: rect.y + rect.height / 2
                        }
                    })))
                ]
            }

            if (clusterExpansionZoom) {
                actions.push(
                    VIEW.transition.linearTo({
                        latitude,
                        longitude,
                        zoom: clusterExpansionZoom
                    })
                )
            }

            if (actions) {
                dispatch(actions)
            }
        }, [
            clusterChildren,
            clusterExpansionZoom,
            dispatch,
            id,
            latitude,
            longitude,
            setIsDetailEnabled
        ]
    )

    useEffect(() => {
        let isMounted = true

        if (source) {
            source.getClusterLeaves(
                id,
                pointCount.total,
                0,
                (err, leaves) => {
                    if (err || !isMounted) {
                        return
                    }

                    if (
                        contextInfo
                        && contextInfo.type === ContextType.FEATURE
                    ) {
                        setIsCurrentContext(
                            leaves.findIndex(
                                ({ properties: { id: _id } }) => (
                                    _id === contextInfo.id
                                )
                            ) !== -1
                        )
                    }

                    if (onDetailsReceived) {
                        onDetailsReceived(leaves)
                    }
                }
            )

            source.getClusterChildren(
                id,
                (err, features) => {
                    if (err || !isMounted) {
                        return
                    }

                    setClusterChildren(features)
                }
            )

            source.getClusterExpansionZoom(
                id,
                (err, zoom) => {
                    if (err || !isMounted) {
                        return
                    }

                    setClusterExpansionZoom(zoom)
                }
            )
        }

        return () => { isMounted = false }
    }, [
        contextInfo,
        id,
        onDetailsReceived,
        pointCount.total,
        source
    ])

    const spacingFactor = 0.25

    // TODO(Johannes): see above
    // eslint-disable-next-line no-unused-vars
    const handleEnter = (isAppearing) => {
        if (parentClusterOrigin && isAppearing) {
            setIsDetailEnabled(false)
        }
    }

    // TODO(Johannes): see above
    // eslint-disable-next-line no-unused-vars
    const handleEntered = (isAppearing) => {
        setIsDetailEnabled(true)
    }

    return (
        // TODO(Johannes): see above
        // <FeatureMarkerTransition
        //     appear
        //     in
        //     onEnter={handleEnter}
        //     onEntered={handleEntered}
        //     parentClusterOrigin={parentClusterOrigin}
        //     unmountOnExit
        // >
        <ButtonBase
            centerRipple
            className={classes.root}
            onClick={handleClick}
            ref={handleRef}
        >
            <Box position="relative">
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width={1}
                    height={1}
                    p={spacingFactor}
                >
                    <Box
                        className={clsx(
                            classes.background,
                            {
                                [`${classes.background}-currentContext`]: isCurrentContext,
                                [`${classes.background}-currentHighlight`]: isCurrentHightlight
                            }
                        )}
                        width={1}
                        height={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            className={classes.pointCount}
                            component="span"
                            variant="subtitle2"
                        >
                            {pointCount.total}
                        </Typography>
                    </Box>
                </Box>
                <DonutChart
                    colorName={isCurrentContext ? 'dark' : 'main'}
                    data={donutData}
                    keyToColor={getColorByTermId}
                    padding={spacingFactor}
                    radius={radius}
                    strokeColor={palette.background.paper}
                    strokeWidth={strokeWidth}
                />
            </Box>
        </ButtonBase>
        // TODO(Johannes): see above
        // </FeatureMarkerTransition>
    )
})

ClusterMarkerComponent.propTypes = {
    contextInfo: PropTypeContextInfo,
    domain: PropTypes.arrayOf(PropTypes.number),
    getSource: PropTypes.func.isRequired,
    highlightId: PropTypes.string,
    id: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    onDetailsReceived: PropTypes.func,
    pointCount: PropTypePointCount.isRequired,
    parentClusterOrigin: PropTypeParentClusterOrigin,
    setIsDetailEnabled: PropTypes.func
}

ClusterMarkerComponent.defaultProps = {
    contextInfo: null,
    domain: null,
    highlightId: null,
    onDetailsReceived: null,
    parentClusterOrigin: null,
    setIsDetailEnabled: null
}

const ClusterMarker = (props) => (
    <Marker
        {...props}
        anchorTo={ANCHOR_TO.center}
        component={ClusterMarkerComponent}
        defaultDimensions={{ height: 48, width: 48 }}
        detailPopperComponent={ClusterMarkerDetailCard}
    />
)

ClusterMarker.propTypes = Marker.propTypes

ClusterMarker.defaultProps = Marker.defaultProps

export default memo(ClusterMarker)
