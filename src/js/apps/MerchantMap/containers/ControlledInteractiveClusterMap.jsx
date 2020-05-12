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
        proximityMarker={
            useSelector((state) => (state.proximityMarker))
        }
    />
)

export default ControlledInteractiveClusterMap
