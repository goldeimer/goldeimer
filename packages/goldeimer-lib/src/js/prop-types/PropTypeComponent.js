import PropTypes from 'prop-types'

const PropTypeComponent = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
])

export default PropTypeComponent
