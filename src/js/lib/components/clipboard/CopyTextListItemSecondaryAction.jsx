import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'

const CopyTextListItemSecondaryAction = ({
    className,
    iconComponent: IconComponent,
    label,
    onClick
}) => (
    <Tooltip
        arrow
        enterDelay={300}
        enterNextDelay={500}
        placement='right-end'
        title={label}
    >
        <ListItemSecondaryAction className={className}>
            <IconButton
                aria-label={label}
                edge='end'
                onClick={onClick}
                size='small'
            >
                <IconComponent fontSize='inherit' />
            </IconButton>
        </ListItemSecondaryAction>
    </Tooltip>
)

CopyTextListItemSecondaryAction.propTypes = {
    className: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

CopyTextListItemSecondaryAction.defaultProps = {
    className: ''
}

export default CopyTextListItemSecondaryAction
