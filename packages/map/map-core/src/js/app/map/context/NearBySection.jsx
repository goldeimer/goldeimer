import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import SimpleBarReact from 'simplebar-react'

import NearMeIcon from '@material-ui/icons/NearMe'

import { concatenateAddress } from '@lib/util'
import StandardList from '@lib/components/StandardList'
import StandardListItem from '@lib/components/StandardList/StandardListItem'

import CONTEXT from '@map/context'
import { CONTEXT_TYPE } from '@map/enum'
import FEATURES, {
    detailToFeatureContext,
    useSourceFeaturesByProximity,
    FeatureIcon
} from '@map/features'
import { formatDistance } from '@map/util'
import VIEW from '@map/view'

import 'simplebar/dist/simplebar.min.css'

const FLY_TO_TRANSITION_ZOOM = 15

const useStyles = makeStyles(({ palette, spacing }) => ({
    chip: {
        backgroundColor: palette.grey[200],
        color: palette.grey[700],
        fontSize: '0.75em'
    },
    nearMeIcon: {
        color: palette.text.secondary
    },
    nearMeIconWrap: {
        display: 'flex',
        fontSize: spacing(3.5),
        lineHeight: 1,
        marginRight: spacing(1)
    }
}))

const getNearBySectionTitleByContextType = (contextType) => {
    switch (contextType) {
        case CONTEXT_TYPE.feature.value:
            return 'Im Umkreis'

        case CONTEXT_TYPE.currentLocation.value:
            return 'Im Umkreis deines Standorts'

        case CONTEXT_TYPE.geocodingResult.value:
            return 'Im Umkreis deines Suchergebnisses'

        default:
            return 'Im Umkreis'
    }
}

const NearBySection = ({
    contextId,
    contextType,
    isScrollEnabled,
    latitude,
    longitude
}) => {
    const rootRef = useRef()

    const dispatch = useDispatch()

    const classes = useStyles()

    const excludeIds = CONTEXT_TYPE.feature.is(contextType)
        ? [contextId]
        : []

    const features = useSourceFeaturesByProximity(
        latitude,
        longitude,
        {
            excludeIds,
            maxResults: 20,
            shouldFilter: true
        }
    )

    const [maxHeight, setMaxHeight] = useState('100%')

    const calculateAndSetMaxHeight = () => {
        if (rootRef.current) {
            const rect = rootRef.current.getBoundingClientRect()
            setMaxHeight(window.innerHeight - rect.top)
        }
    }

    useLayoutEffect(() => {
        const events = ['orientationchange', 'resize']

        events.forEach((event) => window.addEventListener(
            event,
            calculateAndSetMaxHeight
        ))

        calculateAndSetMaxHeight()

        return () => events.forEach((event) => window.removeEventListener(
            event,
            calculateAndSetMaxHeight
        ))
    }, [rootRef])

    useLayoutEffect(() => {
        calculateAndSetMaxHeight()
    }, [contextId])

    if (!features) {
        return null
    }

    const handleClick = (_, clickedId) => {
        const feature = features.find(
            ({ id }) => id === clickedId
        )

        if (feature) {
            dispatch([
                CONTEXT.set(
                    detailToFeatureContext(feature)
                ),
                VIEW.transition.flyTo({
                    latitude: feature.latitude,
                    longitude: feature.longitude,
                    zoom: FLY_TO_TRANSITION_ZOOM
                })
            ])
        }
    }

    // TODO:
    // Throttle dispatches.
    // Kills performance like this.
    const handleMouseEnter = (_, hoveredId) => {
        dispatch([
            FEATURES.view.setHighlightId(hoveredId)
        ])
    }

    const handleMouseLeave = (_, hoveredId) => {
        dispatch([
            FEATURES.view.unsetHighlightId(hoveredId)
        ])
    }

    const nearBySection = (
        <>
            <Box
                alignItems='center'
                display='flex'
                p={2}
                ref={rootRef}
            >
                <span className={classes.nearMeIconWrap}>
                    <NearMeIcon
                        className={classes.nearMeIcon}
                        fontSize='inherit'
                    />
                </span>
                <Typography
                    className='small'
                    component='h2'
                    variant='h6'
                >
                    {getNearBySectionTitleByContextType(contextType)}
                </Typography>
            </Box>
            <StandardList>
                {features && features.map(({
                    city,
                    color,
                    distance,
                    iconComponent,
                    id,
                    placeName,
                    street,
                    ...feature
                }) => (
                    <StandardListItem
                        key={id}
                        iconComponent={FeatureIcon}
                        iconProps={{
                            color,
                            component: iconComponent
                        }}
                        onClick={handleClick}
                        // onMouseEnter={handleMouseEnter}
                        // onMouseLeave={handleMouseLeave}
                        primaryText={placeName}
                        secondaryAction={(
                            <Chip
                                className={classes.chip}
                                label={formatDistance(distance)}
                                size='small'
                            />
                        )}
                        secondaryText={concatenateAddress({ city, street })}
                        value={id}
                    />
                ))}
            </StandardList>
        </>
    )

    return (
        isScrollEnabled
            ? (
                <SimpleBarReact
                    style={{ maxHeight }}
                >
                    {nearBySection}
                </SimpleBarReact>
            ) : nearBySection
    )
}

NearBySection.propTypes = {
    contextId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    contextType: PropTypes.oneOfType([
        PropTypes.number, // Enum.value
        PropTypes.shape({
            get: PropTypes.func,
            has: PropTypes.func,
            is: PropTypes.func,
            toString: PropTypes.func,
            valueOf: PropTypes.func
        })
    ]).isRequired,
    isScrollEnabled: PropTypes.bool,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}

NearBySection.defaultProps = {
    contextId: null,
    isScrollEnabled: false
}

export default NearBySection
