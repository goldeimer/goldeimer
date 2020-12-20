import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import SimpleBarReact from 'simplebar-react'

import NearMeIcon from '@material-ui/icons/NearMe'

import { concatenateAddress } from '@goldeimer/js-util'

import {
    StandardList,
    StandardListItem
} from '@goldeimer/react-components'

import { ContextType } from '../enum'
import FEATURE, {
    detailToFeatureContext,
    useSourceFeaturesByProximity,
    FeatureIcon
} from '../feature'
import { formatDistance } from '../util'
import VIEW from '../view'

import CONTEXT from '.'

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

const getNearBySectionTitleByContextType = (type) => {
    switch (type) {
    case ContextType.FEATURE:
        return 'Im Umkreis'

    case ContextType.LOCATION:
        return 'Im Umkreis deines Standorts'

    case ContextType.GEOCODING_RESULT:
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

    const excludeIds = contextType === ContextType.FEATURE
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

    // TODO(Johannes):
    // Throttle dispatches.
    // Kills performance like this (hence unused / never called at this point).
    // eslint-disable-next-line no-unused-vars
    const handleMouseEnter = (_, hoveredId) => {
        dispatch([
            FEATURE.view.setHighlightId(hoveredId)
        ])
    }

    // eslint-disable-next-line no-unused-vars
    const handleMouseLeave = (_, hoveredId) => {
        dispatch([
            FEATURE.view.unsetHighlightId(hoveredId)
        ])
    }

    const nearBySection = (
        <>
            <Box
                alignItems="center"
                display="flex"
                p={2}
                ref={rootRef}
            >
                <span className={classes.nearMeIconWrap}>
                    <NearMeIcon
                        className={classes.nearMeIcon}
                        fontSize="inherit"
                    />
                </span>
                <Typography
                    className="small"
                    component="h2"
                    variant="h6"
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
                                size="small"
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
            )
            : nearBySection
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
