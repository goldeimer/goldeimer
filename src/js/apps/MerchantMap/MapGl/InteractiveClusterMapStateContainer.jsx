import React from 'react'
import { useSelector } from 'react-redux'

import selectFilteredFeatureCollection
    from 'selectors/selectFilteredFeatureCollection'

import InteractiveClusterMap from './InteractiveClusterMap'

const InteractiveClusterMapStateContainer = () => (
    <InteractiveClusterMap
        featureCollection={
            useSelector(selectFilteredFeatureCollection)
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
