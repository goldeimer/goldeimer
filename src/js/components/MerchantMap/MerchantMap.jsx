import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MapGL from 'react-map-gl';

import muiTheme from 'js/muiTheme';

import {
    getMerchantDataGoldeimer,
    getMerchantDataVca,
} from './getMerchantData';


const MAP_STYLE_URL = 'https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=ELs001Fn1Ojoa3POXZTf';


const MerchantMap = () =>
{
    const [merchantDataGoldeimer, setMerchantDataGoldeimer] = useState(null);
    const [merchantDataVca, setMerchantDataVca] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 51.2,
        longitude: 10.4,
        zoom: 5,
        bearing: 0,
        pitch: 0
    });

    useEffect(
        () => {
            const fetchDataGoldeimer = async () => {
                const data = await getMerchantDataGoldeimer();
                setMerchantDataGoldeimer(data);
            };

            const fetchDataVca = async () => {
                const data = await getMerchantDataVca();
                setMerchantDataVca(data);
            };

            fetchDataGoldeimer();
            fetchDataVca();
        },
        []
    );

    return (
        <ThemeProvider theme={muiTheme}>
            <MapGL
                {...viewport}
                width="100vw"
                height="100vh"
                mapStyle={MAP_STYLE_URL}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapboxApiAccessToken={''}
            />
            <h1>Merchant Map</h1>
            <code>
                {
                    merchantDataGoldeimer
                    ? JSON.stringify(merchantDataGoldeimer[0])
                    : ''
                }
            </code>
            <br />
            <code>
                {
                    merchantDataVca
                    ? JSON.stringify(merchantDataVca[0])
                    : ''
                }
            </code>
        </ThemeProvider>
    );
}


export default MerchantMap;
