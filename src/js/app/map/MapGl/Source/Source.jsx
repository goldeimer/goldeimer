import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Source as SourceGl } from 'react-map-gl'

import {
    getPrimaryTaxonomy,
    getSecondaryTaxonomy
} from '@map/taxonomies'

const GEOJSON_SOURCE_ID = 'features'

const makeClusterPropertyTermCount = (
    {
        taxonomyId,
        terms = []
    },
    taxonomyMetaName = 'primaryTaxonomy'
) => terms.reduce((acc, term) => ({
    ...acc,
    [`${taxonomyMetaName}:${term.termId}`]: (
        ['+', ['case', ['in', term.termId, ['get', `${taxonomyId}`]], 1, 0]]
    )
}), {})

const makeClusterProperties = (
    primaryTaxonomy = getPrimaryTaxonomy(),
    secondaryTaxonomy = getSecondaryTaxonomy()
) => ({
    ...makeClusterPropertyTermCount(
        primaryTaxonomy,
        'primaryTaxonomy'
    ),
    ...makeClusterPropertyTermCount(
        secondaryTaxonomy,
        'secondaryTaxonomy'
    )
})

const Source = forwardRef(({
    children,
    featureCollection
}, ref) => {
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
            clusterProperties={makeClusterProperties()}
            clusterRadius={80}
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
