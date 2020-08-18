import React from 'react'
import PropTypes from 'prop-types'

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'

const StandardListItemSecondaryAction = ({
    children,
    className,
    label
}) => (
    <Tooltip
        arrow
        enterNextDelay={300}
        placement='right'
        title={label || ''}
    >
        <ListItemSecondaryAction className={className}>
            {children}
        </ListItemSecondaryAction>
    </Tooltip>
)

StandardListItemSecondaryAction.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    label: PropTypes.string
}

StandardListItemSecondaryAction.defaultProps = {
    children: null,
    className: '',
    label: null
}

export default StandardListItemSecondaryAction
