import React from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Link'

const ExternalLink = ({ children, ...props }) => (
    <Link
        rel="noopener noreferrer"
        target="_blank"
        {...props}
    >
        {children}
    </Link>
)

ExternalLink.propTypes = {
    children: PropTypes.node.isRequired
}

export default ExternalLink
