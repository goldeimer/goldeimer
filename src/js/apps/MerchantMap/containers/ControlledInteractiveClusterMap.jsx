import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { geoJson_source_set } from 'actions/merchantMapActions'
import getGeoJsonSource from '../getGeoJsonSource'

import InteractiveClusterMap from
    '../components/InteractiveClusterMap/InteractiveClusterMap'

const ControlledInteractiveClusterMap = () => {
    const dispatch = useDispatch()

    // TODO: Move to action creator.
    useEffect(
        () => {
            const fetchGeoJson = async () => {
                const geoJson = await getGeoJsonSource()

                dispatch(geoJson_source_set(geoJson))
            }

            fetchGeoJson()
        },
        []
    )

    return (
        <InteractiveClusterMap
            geoJsonSource={useSelector((state) => (state.geoJson.source))}
            proximityMarker={useSelector((state) => (state.proximityMarker))}
        />
    )
}

export default ControlledInteractiveClusterMap
