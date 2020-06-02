import React, { memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'

const useStyles = makeStyles((theme) => ({
    avatar: ({ color }) => {
        const backgroundColor = color !== null
            ? color
            : theme.palette.primary.main

        return {
            color: theme.palette.getContrastText(backgroundColor),
            backgroundColor
        }
    }
}))

const FeatureMarkerComponent = ({
    color,
    iconComponent: IconComponent,
    ...other
}) => {
    const classes = useStyles({ color })

    return (
        <Avatar
            {...other}
            className={clsx(classes.avatar, other.className)}
        >
            <IconComponent />
        </Avatar>
    )
}

FeatureMarkerComponent.propTypes = {
    color: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired
}

FeatureMarkerComponent.defaultProps = {
    color: null
}

const FeatureMarkerComponentMemoized = memo(FeatureMarkerComponent)

const FeatureMarker = ({
    component,
    ...other
}) => (
    <Marker
        {...other}
        anchorTo={ANCHOR_TO.center}
        component={component || FeatureMarkerComponentMemoized}
    />
)

FeatureMarker.propTypes = {
    ...Marker.propTypes,
    component: PropTypes.elementType
}

FeatureMarker.defaultProps = {
    ...Marker.defaultProps,
    component: null
}

export default FeatureMarker
