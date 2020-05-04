import muiTheme from 'config/muiTheme';


const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'merchants',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': muiTheme.palette.primary.main,
        'circle-radius': [
            'step',
            ['get', 'point_count'],
            15,
            10, 18,
            20, 21,
            50, 24,
            100, 27,
            200, 30,
            500, 33,
        ],
        'circle-stroke-width': 1,
        'circle-stroke-color': '#000',
    },
};


const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'merchants',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': [
            'DIN Offc Pro Medium',
            'Arial Unicode MS Bold',
        ],
        'text-size': 12,
    },
};


const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'merchants',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': muiTheme.palette.primary.main,
        'circle-radius': 5,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#000',
    },
};


export {
    clusterLayer,
    clusterCountLayer,
    unclusteredPointLayer,
};
