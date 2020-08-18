import PropTypes from 'prop-types'

const idProps = {
    id: PropTypes.string,
    type: PropTypes.number
}

const PropTypeContextInfo = PropTypes.exact(idProps)

const PropTypeContext = PropTypes.shape({
    ...idProps,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    placeName: PropTypes.string
})

export {
    PropTypeContext as default,
    PropTypeContextInfo
}
