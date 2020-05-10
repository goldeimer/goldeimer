import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFeatureCollection } from 'actions/merchantMapActions'
import selectFilteredFeatureCollection
    from 'selectors/selectFilteredFeatureCollection'

import InteractiveClusterMap from
    '../components/InteractiveClusterMap/InteractiveClusterMap'

const ControlledInteractiveClusterMap = () => {
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(fetchFeatureCollection())
        },
        []
    )

    return (
        <InteractiveClusterMap
            featureCollection={
                useSelector(selectFilteredFeatureCollection)
            }
            proximityMarker={
                useSelector((state) => (state.proximityMarker))
            }
        />
    )
}

export default ControlledInteractiveClusterMap
