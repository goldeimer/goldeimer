import React, { useEffect, useRef, useState, } from 'react';
import { ThemeProvider, } from '@material-ui/core/styles';

import MapIcon from '@material-ui/icons/Map';

import muiTheme from 'config/muiTheme';

import InteractiveClusterMap from
'./components/InteractiveClusterMap/InteractiveClusterMap';
import FloatingActionButton from
'./components/FloatingActionButton/FloatingActionButton'

import ACTIONS from './config/actions';
import getMerchantGeoJson from './getMerchantGeoJson';


const MerchantMap = () =>
{
    const [currentAction, setCurrentAction] = useState(null);
    const [merchantGeoJson, setMerchantGeoJson] = useState(null);

    // componentDidMount
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
                <h1>Händler</h1>
                <FloatingActionButton
                    actions={ACTIONS}
                    openIcon={<MapIcon />}
                    setAction={setCurrentAction}
                />
            </ThemeProvider>
        </div>
    );
};


export default MerchantMap;
