import React from 'react'
import { useSelector } from 'react-redux'

import { selectFilteredMapEssential } from 'selectors/map/selectFeatures'

import InteractiveClusterMap from '@map/MapGl/InteractiveClusterMap'

const InteractiveClusterMapStateContainer = () => (
    <InteractiveClusterMap
        featureCollection={
            useSelector(selectFilteredMapEssential)
        }
        context={
            useSelector((state) => (state.map.context))
        }
    />
)

export default InteractiveClusterMapStateContainer
