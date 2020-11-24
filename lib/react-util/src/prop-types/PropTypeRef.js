import PropTypes from 'prop-types'

const PropTypeRef = /*@__PURE__*/ PropTypes.oneOfType([
    PropTypes.func,
    /*@__PURE__*/ PropTypes.shape({
        current:
        /*@__PURE__*/ PropTypes.instanceOf(Element)
    })
])

export default PropTypeRef
