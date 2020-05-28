import React from 'react'
import { useSelector } from 'react-redux'

import { selectFilteredMapEssential } from 'selectors/map/selectFeatures'

import InteractiveClusterMap from './InteractiveClusterMap'

const InteractiveClusterMapStateContainer = () => (
    <InteractiveClusterMap
        featureCollection={
            useSelector(selectFilteredMapEssential)
        }
        featureMarker={
            useSelector((state) => (state.marker.feature))
        }
        proximityMarker={
            useSelector((state) => (state.marker.proximity))
        }
    />
)

export default InteractiveClusterMapStateContainer
