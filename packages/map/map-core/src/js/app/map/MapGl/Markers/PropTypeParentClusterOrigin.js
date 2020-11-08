import PropTypes from 'prop-types'

const PropTypeParentClusterOrigin = PropTypes.exact({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    y: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired
})

export default PropTypeParentClusterOrigin
