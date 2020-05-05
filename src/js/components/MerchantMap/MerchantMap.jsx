import React, { useEffect, useRef, useState, } from 'react';
import { ThemeProvider, } from '@material-ui/core/styles';

import muiTheme from 'config/muiTheme';

import InteractiveClusterMap from
'./components/InteractiveClusterMap/InteractiveClusterMap';
import FloatingActionButton from
'./components/FloatingActionButton/FloatingActionButton'

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
            <ThemeProvider theme={muiTheme}>
                <FloatingActionButton />
            </ThemeProvider>
        </div>
    );
};


export default MerchantMap;
