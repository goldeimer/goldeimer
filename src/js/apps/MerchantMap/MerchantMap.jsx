import React, { useEffect, useState } from 'react'

import InteractiveClusterMap from
    './components/InteractiveClusterMap/InteractiveClusterMap'
import MapControlUiLayer from
    './components/MapControlUiLayer/MapControlUiLayer'

import getMerchantGeoJson from './getMerchantGeoJson'

const MerchantMap = () => {
    const [merchantGeoJson, setMerchantGeoJson] = useState(null)

    useEffect(
        () => {
            const fetchGeoJson = async () => {
                const geoJson = await getMerchantGeoJson()
                setMerchantGeoJson(geoJson)
            }

            fetchGeoJson()
        },
        []
    )

    return (
        <>
            <InteractiveClusterMap geoJsonSource={merchantGeoJson} />
            <MapControlUiLayer />
        </>
    )
}

export default MerchantMap
