import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchGeoJsonSource } from 'actions/merchantMapActions'

import InteractiveClusterMap from
    '../components/InteractiveClusterMap/InteractiveClusterMap'

const ControlledInteractiveClusterMap = () => {
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(fetchGeoJsonSource())
        },
        []
    )

    return (
        <InteractiveClusterMap
            geoJsonSource={useSelector((state) => (state.geoJsonSource))}
            proximityMarker={useSelector((state) => (state.proximityMarker))}
        />
    )
}

export default ControlledInteractiveClusterMap
