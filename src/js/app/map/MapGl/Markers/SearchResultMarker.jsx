import React from 'react'

import Box from '@material-ui/core/Box'

import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'

import { MarkerIcon } from '@map/icons/ui'

const SearchResultMarkerComponent = () => (
    <Box
        fontSize='2.5rem'
        display='flex'
        flexShrink={1}
    >
        <MarkerIcon fontSize='inherit' />
    </Box>
)

const SearchResultMarker = (props) => (
    <Marker
        {...props}
        anchorTo={ANCHOR_TO.top}
        component={SearchResultMarkerComponent}
        defaultDimensions={{ height: 40, width: 40 }}
    />
)

export default SearchResultMarker
