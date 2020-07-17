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
import { getColorByTaxonomyTermId } from '@map/taxonomies'
import VIEW from '@map/view'

import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'
import DonutChart from './DonutChart'

const DETAIL_THRESHOLD = 5

const makeScale = (domain, range) => (
    d3ScaleLog().domain(domain).range(range)
)

const useStyles = makeStyles(({ palette }) => ({
    root: {
        borderRadius: '50%',
        backgroundColor: palette.primary.main
    },
    currentContext: {
        backgroundColor: palette.primary.dark
    },
    pointCount: {
        display: 'block',
        color: palette.primary.contrastText,
        lineHeight: 1,
        marginTop: 1,
        marginLeft: 1,
        fontSize: '0.75rem'
    }
}), { name: 'ClusterMarker' })

const ClusterMarkerComponent = forwardRef(({
    contextInfo,
    domain,
    getSource,
    id,
    latitude,
    longitude,
    pointCount
}, ref) => {
    const [featureIds, setFeatureIds] = useState([])
    // const [features, setFeatures] = useState([])

    const dispatch = useDispatch()

    const strokeWidth = 2
    const classes = useStyles({ rootPadding: strokeWidth })
    const { palette, spacing } = useTheme()

    const range = [spacing(5), spacing(9)]
    const scale = useMemo(() => makeScale(
        domain,
        range
    ), [domain, range])

    const isCurrentContext = contextInfo ? (
        CONTEXT_TYPE.feature.is(contextInfo.type) &&
        featureIds.includes(contextInfo.id)
    ) : false

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

    const circumference = domain
        ? Math.ceil(scale(pointCount.total))
        : (range[1] - (range[1] - range[0]))

    const radius = circumference / 2

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

                    setFeatureIds(
                        leaves.map(
                            ({ properties: { id: _id } }) => _id
                        )
                    )

                    // if (pointCount.total < DETAIL_THRESHOLD) {
                    //     setFeatures(leaves)
                    // }
                }
            )
        }
    }, [getSource, pointCount.total, id])

    return (
        <ButtonBase
            centerRipple
            className={clsx(
                classes.root,
                { [classes.currentContext]: isCurrentContext }
            )}
            onClick={handleClick}
            ref={ref}
        >
            <Box position='relative'>
                <DonutChart
                    colorName={isCurrentContext ? 'dark' : 'main'}
                    data={pointCount.secondaryTaxonomy}
                    keyToColor={getColorByTaxonomyTermId}
                    radius={radius}
                    strokeColor={palette.background.paper}
                    strokeWidth={strokeWidth}
                />
                <Box
                    display='flex'
                    position='absolute'
                    top={0}
                    left={0}
                    width={1}
                    height={1}
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
    pointCount: PropTypes.shape({
        total: PropTypes.number,
        primaryTaxonomy: PropTypes.objectOf(PropTypes.number),
        secondaryTaxonomy: PropTypes.objectOf(PropTypes.number)
    }).isRequired
}

ClusterMarkerComponent.defaultProps = {
    contextInfo: null,
    domain: null
}

const ClusterMarker = (props) => (
    <Marker
        {...props}
        anchorTo={ANCHOR_TO.center}
        component={ClusterMarkerComponent}
        defaultDimensions={{ height: 48, width: 48 }}
        // renderDetailCard={(detail) =>
        // <FeatureMarkerDetailCard {...detail} />}
    />
)

ClusterMarker.propTypes = Marker.propTypes

ClusterMarker.defaultProps = Marker.defaultProps

export default memo(ClusterMarker)
