import React from 'react'
import PropTypes from 'prop-types'

import SvgIcon from '@material-ui/core/SvgIcon'

const InlineSvgIcon = ({ svg, ...other }) => (
    <SvgIcon {...other}>{svg}</SvgIcon>
)

InlineSvgIcon.propTypes = {
    svg: PropTypes.string.isRequired
}

export default InlineSvgIcon
