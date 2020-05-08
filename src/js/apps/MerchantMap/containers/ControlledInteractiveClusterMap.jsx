import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import InteractiveClusterMap from
    '../components/InteractiveClusterMap/InteractiveClusterMap'

const ControlledInteractiveClusterMap = ({ geoJsonSource }) => (
    <InteractiveClusterMap
        geoJsonSource={geoJsonSource}
        proximityMarker={useSelector((state) => (state.proximityMarker))}
    />
)

ControlledInteractiveClusterMap.propTypes = {
    /* eslint-disable-next-line react/forbid-prop-types */
    geoJsonSource: PropTypes.object
}

ControlledInteractiveClusterMap.defaultProps = {
    geoJsonSource: null
}

export default ControlledInteractiveClusterMap
