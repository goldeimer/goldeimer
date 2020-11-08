import PropTypes from 'prop-types'

const PropTypeRef = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
])

export default PropTypeRef
