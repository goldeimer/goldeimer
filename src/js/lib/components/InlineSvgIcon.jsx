import React, { memo } from 'react'
import PropTypes from 'prop-types'

import SvgIcon from '@material-ui/core/SvgIcon'

const InlineSvgIcon = ({ svg, ...other }) => {
    const paths = Array.from(svg.matchAll(/<path\s+?d="(?<d>[^"]*?)"/mgu))

    return (
        <SvgIcon {...other}>
            {paths.map((path) => <path d={path[1]} key={path[1]} />)}
        </SvgIcon>
    )
}

InlineSvgIcon.propTypes = {
    svg: PropTypes.string.isRequired
}

export default memo(InlineSvgIcon)
