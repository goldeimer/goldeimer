import React, { useEffect, useState, } from 'react';

import InteractiveClusterMap from
    './components/InteractiveClusterMap/InteractiveClusterMap';
import MapControlUiLayer from
    './components/MapControlUiLayer/MapControlUiLayer'

import getMerchantGeoJson from './getMerchantGeoJson';


const MerchantMap = () =>
{
    const [merchantGeoJson, setMerchantGeoJson] = useState(null);

    useEffect(
        () => {
            const fetchGeoJson = async () => {
                const geoJson = await getMerchantGeoJson();
                setMerchantGeoJson(geoJson);
            };

            fetchGeoJson();
        },
        []
    );

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <InteractiveClusterMap geoJsonSource={merchantGeoJson} />
            <MapControlUiLayer />
        </div>
    );
};


export default MerchantMap;
