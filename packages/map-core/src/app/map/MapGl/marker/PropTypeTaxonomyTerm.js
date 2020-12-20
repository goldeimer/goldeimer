import PropTypes from 'prop-types'

import { PropTypeColor } from '@map/features'

const PropTypeTerm = PropTypes.shape({
    color: PropTypeColor,
    iconComponent: PropTypes.elementType,
    termName: PropTypes.string
})

export default PropTypeTerm
