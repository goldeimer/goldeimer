import React, { useEffect, useState } from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'

import merchantMapReducer from 'reducers/MerchantMap/rootReducerMerchantMap'

import ControlledInteractiveClusterMap from
    './containers/ControlledInteractiveClusterMap'
import MapControlUiLayer from
    './components/MapControlUiLayer/MapControlUiLayer'

import getMerchantGeoJson from './getMerchantGeoJson'

const merchantMapStore = createStore(merchantMapReducer)

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
        <ReduxProvider store={merchantMapStore}>
            <ControlledInteractiveClusterMap geoJsonSource={merchantGeoJson} />
            <MapControlUiLayer />
        </ReduxProvider>
    )
}

export default MerchantMap
