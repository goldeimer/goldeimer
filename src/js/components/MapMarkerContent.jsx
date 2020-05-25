import React from 'react'
import PropTypes from 'prop-types'

import MarkerIcon from '@material-ui/icons/Room'

import useHover from 'hooks/useHover'

import ArrowPopper from 'components/ArrowPopper'
import MapMarkerDetailCard from 'components/MapMarkerDetailCard'

const MapMarkerContent = ({
    component: Component,
    placeName,
    uuid,
    ...componentProps
}) => {
    // TODO:
    // Employ uuid to fetch detail data.

    const {
        bind,
        currentTriggerEl,
        isHovered
    } = useHover()

    return (
        <>
            <ArrowPopper
                anchorEl={currentTriggerEl}
                isOpen={isHovered}
            >
                <MapMarkerDetailCard
                    placeName={placeName}
                />
            </ArrowPopper>
            <Component
                {...bind}
                {...componentProps}
                uuid={uuid}
            />
        </>
    )
}

MapMarkerContent.propTypes = {
    component: PropTypes.elementType,
    placeName: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired
}

MapMarkerContent.defaultProps = {
    component: MarkerIcon
}

export default MapMarkerContent
