import React from 'react'
import { PropTypes } from 'prop-types'

import Box from '@material-ui/core/Box'

const TitleIcon = ({ children }) => (
    <Box
        alignItems="center"
        display="inline-flex"
        mr={1.5}
    >
        {children}
    </Box>
)

TitleIcon.propTypes = {
    children: PropTypes.element.isRequired
}

export default TitleIcon
