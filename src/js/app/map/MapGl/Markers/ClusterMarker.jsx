import React, {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useState
} from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { scaleLog as d3ScaleLog } from 'd3-scale'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import useMemo from '@lib/hooks/useMemo'

import {
    CONTEXT_TYPE,
    PropTypeContextInfo
} from '@map/context'
import { getColorByTermId } from '@map/config/taxonomies'
import VIEW from '@map/view'

import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import DonutChart from '@lib/components/data-display/DonutChart'

import ClusterMarkerDetailCard
    from '@map/MapGl/Markers/ClusterMarkerDetailCard'
import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'
import PropTypePointCount from '@map/MapGl/Markers/PropTypePointCount'

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
    id,
    latitude,
    longitude,
    onDetailsReceived,
    pointCount
}, ref) => {
    const [isCurrentContext, setIsCurrentContext] = useState(false)

    const dispatch = useDispatch()

    const strokeWidth = 2
    const classes = useStyles({ rootPadding: strokeWidth })
    const { palette, spacing } = useTheme()

    const range = [spacing(5), spacing(8.5)]
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

    const handleClick = useCallback(
        () => {
            const source = getSource()
            // const children = source.getClusterChildren(id)
            // console.log(children)

            source.getClusterExpansionZoom(
                id,
                (err, zoom) => {
                    if (err) {
                        return
                    }

                    dispatch(
                        VIEW.transition.linearTransitionTo({
                            latitude,
                            longitude,
                            zoom
                        })
                    )
                }
            )
        },
        [dispatch, getSource, id, latitude, longitude]
    )

    useEffect(() => {
        const source = getSource()
        if (source) {
            source.getClusterLeaves(
                id,
                pointCount.total,
                0,
                (err, leaves) => {
                    if (err) {
                        return
                    }

                    if (
                        contextInfo &&
                        CONTEXT_TYPE.feature.is(contextInfo.type)
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
        }
    }, [
        contextInfo,
        getSource,
        onDetailsReceived,
        pointCount.total,
        id
    ])

    const spacingFactor = 0.25

    return (
        <ButtonBase
            centerRipple
            className={classes.root}
            onClick={handleClick}
            ref={ref}
        >
            <Box position='relative'>
                <Box
                    position='absolute'
                    top={0}
                    left={0}
                    width={1}
                    height={1}
                    p={spacingFactor}
                >
                    <Box
                        className={clsx(
                            classes.background,
                            { [`${classes.background}-currentContext`]: isCurrentContext }
                        )}
                        width={1}
                        height={1}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Typography
                            className={classes.pointCount}
                            component='span'
                            variant='subtitle2'
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
    )
})

ClusterMarkerComponent.propTypes = {
    contextInfo: PropTypeContextInfo,
    domain: PropTypes.arrayOf(PropTypes.number),
    getSource: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    onDetailsReceived: PropTypes.func,
    pointCount: PropTypePointCount.isRequired
}

ClusterMarkerComponent.defaultProps = {
    contextInfo: null,
    domain: null,
    onDetailsReceived: null
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
