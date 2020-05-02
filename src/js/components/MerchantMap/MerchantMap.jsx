import React, { useEffect, useRef, useState, } from 'react';
import { ThemeProvider, } from '@material-ui/core/styles';
import MapGL, { Source, Layer, } from 'react-map-gl';

import muiTheme from 'js/muiTheme';

import {
    clusterLayer,
    clusterCountLayer,
    unclusteredPointLayer,
} from './layers';

import getMerchantData from './getMerchantData';


const MAP_STYLE_URL = 'https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=ELs001Fn1Ojoa3POXZTf';


const MerchantMap = () =>
{
    const sourceRef = useRef();

    const [merchantData, setMerchantData] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 50.75,
        longitude: 10,
        zoom: 5,
        bearing: 0,
        pitch: 0
    });

    useEffect(
        () => {
            const fetchData = async () => {
                const data = await getMerchantData();
                setMerchantData(data);
            };

            fetchData();
        },
        []
    );

    const onViewportChange = (nextViewport) => setViewport(nextViewport);

    const onClusterClick = (feature) =>
    {
        const clusterId = feature.properties.cluster_id;
        const mapboxSource = sourceRef.current.getSource();

        mapboxSource.getClusterExpansionZoom(
            clusterId,
            (err, zoom) =>
            {
                if (err) {
                    return;
                }

                onViewportChange(
                    {
                        ...viewport,
                        longitude: feature.geometry.coordinates[0],
                        latitude: feature.geometry.coordinates[1],
                        zoom,
                        transitionDuration: 500
                    }
                );
            }
        );
    };

    const onClick = (event) =>
    {
        const feature = event.features[0];

        switch (feature.layer.id)
        {
            case clusterLayer.id:
            case clusterCountLayer.id:
                onClusterClick(feature);
                break;

            case unclusteredPointLayer.id:
                break;
        }
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <MapGL
                {...viewport}
                width="100vw"
                height="100vh"
                //interactiveLayerIds={[clusterLayer.id]}
                mapboxApiAccessToken={''}
                mapStyle={MAP_STYLE_URL}
                onClick={onClick}
                onViewportChange={onViewportChange}
            >
            {
                merchantData
                && <Source
                    type="geojson"
                    data={merchantData}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    ref={sourceRef}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>
                }
            </MapGL>
        </ThemeProvider>
    );
}


export default MerchantMap;
