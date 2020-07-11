import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

import CopyTextListItemSecondaryAction
    from '@lib/components/clipboard/CopyTextListItemSecondaryAction'

const CopyTextListItem = ({
    icon,
    handleClick,
    handleCopy: handleCopyImpl,
    label,
    renderSecondaryActions,
    text,
    value
}) => {
    const copyLabel = 'Kopieren'
    const handleCopy = () => handleCopyImpl(value)

    return (
        <ListItem
            button
            onClick={handleClick || handleCopy}
            role='listitem'
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <Tooltip
                arrow
                enterDelay={300}
                enterNextDelay={500}
                placement='bottom'
                title={label || copyLabel}
            >
                <ListItemText primary={text} />
            </Tooltip>
            {renderSecondaryActions && renderSecondaryActions()}
            <CopyTextListItemSecondaryAction
                iconComponent={FileCopyOutlinedIcon}
                label={copyLabel}
                onClick={handleCopy}
            />
        </ListItem>
    )
}

CopyTextListItem.propTypes = {
    icon: PropTypes.node.isRequired,
    handleClick: PropTypes.func,
    handleCopy: PropTypes.func.isRequired,
    label: PropTypes.string,
    renderSecondaryActions: PropTypes.func,
    text: PropTypes.string,
    value: PropTypes.string.isRequired
}

CopyTextListItem.defaultProps = {
    handleClick: null,
    label: null,
    renderSecondaryActions: null,
    text: null
}

export default CopyTextListItem
