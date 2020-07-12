const makeLayers = (theme) => ({
    clusterLayer: {
        id: 'clusters',
        type: 'circle',
        source: 'features',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': theme.palette.primary.main,
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10, 18,
                20, 21,
                50, 24,
                100, 27,
                200, 30,
                500, 33
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': theme.palette.primary.contrastText
        }
    },
    clusterCountLayer: {
        id: 'cluster-count',
        type: 'symbol',
        source: 'features',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        },
        paint: {
            'text-color': theme.palette.primary.contrastText
        }
    },
    unclusteredPointLayer: {
        id: 'unclustered-point',
        type: 'circle',
        source: 'features',
        filter: ['!', ['has', 'point_count']],
        layout: { visibility: 'none' }
    }
})

export default makeLayers
