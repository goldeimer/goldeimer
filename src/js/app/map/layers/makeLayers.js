const makeLayers = () => ({
    clusterLayer: {
        id: 'cluster-count',
        type: 'circle',
        source: 'features',
        filter: ['has', 'point_count'],
        // Min. one layer must be painted for mapbox-gl-js'
        // internal calculations to happen.
        paint: {
            'circle-opacity': 0
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
