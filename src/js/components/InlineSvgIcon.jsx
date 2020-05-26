import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import SvgIcon from '@material-ui/core/SvgIcon'

/// Oh, SVG. You sexy bitch.
/// - 7 ways to render it in HTML
/// - 3 loaders for webpack for each way
/// --> None (!) of them play nice with material-ui's `SvgIcon` component.
/// --> TODO: Do this in a webpack loader.
const InlineSvgIcon = ({ svg, ...other }) => {
    const svgRef = useRef()

    const paths = svg.replace(
        /^<svg.*?>/,
        ''
    ).replace(
        /<\/svg>$/,
        ''
    )

    useEffect(() => {
        if (svgRef.current) {
            svgRef.current.innerHTML = paths
        }
    }, [svgRef])

    return (
        <SvgIcon {...other} ref={svgRef} />
    )
}

InlineSvgIcon.propTypes = {
    svg: PropTypes.string.isRequired
}

export default InlineSvgIcon
