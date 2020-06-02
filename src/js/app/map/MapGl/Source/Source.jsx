import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Source as SourceGl } from 'react-map-gl'

const GEOJSON_SOURCE_ID = 'features'

const Source = forwardRef(({ children, featureCollection }, ref) => {
    if (!featureCollection) {
        return null
    }

    return (
        <SourceGl
            attribution=''
            // mapbox-gl-js default: 128
            buffer={64}
            cluster
            clusterMaxZoom={14}
            clusterProperties={null}
            clusterRadius={50}
            data={featureCollection}
            id={GEOJSON_SOURCE_ID}
            maxzoom={17}
            promoteId='id'
            ref={ref}
            // mapbox-gl-js default: 0.375
            tolerance={0.375}
            type='geojson'
        >
            {children}
        </SourceGl>
    )
})

Source.propTypes = {
    children: PropTypes.node,
    featureCollection: PropTypes.exact({
        type: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            geometry: PropTypes.object,
            properties: PropTypes.object
        }))
    })
}

Source.defaultProps = {
    children: null,
    featureCollection: null
}

export default Source
