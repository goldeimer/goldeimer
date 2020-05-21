import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import CloseButton from 'components/CloseButton/CloseButton'
import TitleIcon from 'components/TitleIcon/TitleIcon'

const StandardDialogTitle = ({
    icon,
    isDense,
    onClose,
    text
}) => (
    <Box
        alignItems="center"
        display="flex"
        px={isDense ? 2 : (onClose ? 2 : 3)}
        py={2}
    >
        {icon && <TitleIcon>{icon}</TitleIcon>}
        <Box flexGrow={1}>
            <Typography variant="h6" component="h2">
                {text}
            </Typography>
        </Box>
        {onClose && <CloseButton isDense={isDense} onClose={onClose} />}
    </Box>
)

StandardDialogTitle.propTypes = {
    icon: PropTypes.node,
    isDense: PropTypes.bool,
    onClose: PropTypes.func,
    text: PropTypes.string.isRequired
}

StandardDialogTitle.defaultProps = {
    icon: null,
    isDense: false,
    onClose: null
}

export default StandardDialogTitle
