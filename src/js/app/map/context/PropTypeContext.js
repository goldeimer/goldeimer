import PropTypes from 'prop-types'

const PropTypeContext = PropTypes.shape({
    id: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    placeName: PropTypes.string,
    type: PropTypes.number
})

export default PropTypeContext
