import React from 'react'
import { useSelector } from 'react-redux'

import selectFilteredFeatureCollection
    from 'selectors/selectFilteredFeatureCollection'

import InteractiveClusterMap from
    '../components/InteractiveClusterMap/InteractiveClusterMap'

const ControlledInteractiveClusterMap = () => (
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

export default ControlledInteractiveClusterMap
