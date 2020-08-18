import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'

import { preventBubble } from '@lib/util'

const StandardListItemSecondaryIconAction = ({
    className,
    iconComponent: IconComponent,
    label,
    onClick,
    value
}) => {
    const handleClick = (event) => {
        preventBubble(event)
        if (onClick) {
            onClick(event, value)
        }
    }

    return (
        <Tooltip
            arrow
            enterNextDelay={300}
            placement='right'
            title={label}
        >
            <ListItemSecondaryAction className={className}>
                <IconButton
                    aria-label={label}
                    edge='end'
                    onClick={handleClick}
                    size='small'
                >
                    <IconComponent fontSize='inherit' />
                </IconButton>
            </ListItemSecondaryAction>
        </Tooltip>
    )
}

StandardListItemSecondaryIconAction.propTypes = {
    className: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    value: PropTypes.string
}

StandardListItemSecondaryIconAction.defaultProps = {
    className: '',
    onClick: null,
    value: null
}

export default StandardListItemSecondaryIconAction
