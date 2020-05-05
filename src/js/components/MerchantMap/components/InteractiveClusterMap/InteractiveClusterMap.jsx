import React, { useRef, useState, } from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider, } from '@material-ui/core/styles';
import MapGL, { Source, Layer, } from 'react-map-gl';

import {
    clusterLayer,
    clusterCountLayer,
    unclusteredPointLayer,
} from './layers';


const MAP_STYLE_URL = 'https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=ELs001Fn1Ojoa3POXZTf';


const InteractiveClusterMap = ({ geoJsonSource }) =>
{
    const sourceRef = useRef();

    const [viewport, setViewport] = useState({
        latitude: 50.75,
        longitude: 10,
        zoom: 5,
        bearing: 0,
        pitch: 0
    });

    const handleViewportChange = (nextViewport) => setViewport(nextViewport);

    const handleClusterClick = (feature) =>
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

    const handleMarkerClick = (feature) =>
    {
        console.log(feature);
    }

    const handleClick = (event) =>
    {
        if ('features' in event && event.features.length)
        {
            const feature = event.features[0];

            if ('layer' in feature)
            {
                switch (feature.layer.id)
                {
                    case clusterLayer.id:
                    case clusterCountLayer.id:
                        handleClusterClick(feature);
                        break;

                    case unclusteredPointLayer.id:
                        handleMarkerClick(feature);
                        break;
                }
            }
        }
    }

    return (
        <MapGL
            {...viewport}
            width='100%'
            height='100%'
            attributionControl={false}
            interactiveLayerIds={
                [
                    clusterLayer.id,
                    clusterCountLayer.id,
                    unclusteredPointLayer.id,
                ]
            }
            mapboxApiAccessToken=''
            mapStyle={MAP_STYLE_URL}
            onClick={handleClick}
            onViewportChange={handleViewportChange}
            transitionDuration={500}
        >
            {
                geoJsonSource &&
                <Source
                    type='geojson'
                    data={geoJsonSource}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    generateId={true}
                    ref={sourceRef}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>
            }
        </MapGL>
    );
}


InteractiveClusterMap.propTypes = {
    geoJsonSource: PropTypes.object,
};


export default InteractiveClusterMap;

