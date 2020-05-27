import React from 'react'
import { useSelector } from 'react-redux'

import selectFilteredFeatures from 'selectors/selectFilteredFeatures'

import InteractiveClusterMap from './InteractiveClusterMap'

const InteractiveClusterMapStateContainer = () => (
    <InteractiveClusterMap
        features={
            useSelector(selectFilteredFeatures)
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
