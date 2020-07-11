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
    className,
    handleClick,
    handleCopy: handleCopyImpl,
    icon,
    label,
    renderSecondaryActions,
    text,
    textClassName,
    value
}) => {
    const copyLabel = 'Kopieren'
    const handleCopy = () => handleCopyImpl(value)

    return (
        <ListItem
            button
            className={className}
            onClick={handleClick || handleCopy}
            role='listitem'
        >
            <ListItemIcon className='tighter'>
                {icon}
            </ListItemIcon>
            <Tooltip
                arrow
                enterDelay={300}
                enterNextDelay={500}
                placement='bottom'
                title={label || copyLabel}
            >
                <ListItemText className={textClassName} primary={text} />
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
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    handleClick: PropTypes.func,
    handleCopy: PropTypes.func.isRequired,
    label: PropTypes.string,
    renderSecondaryActions: PropTypes.func,
    text: PropTypes.string,
    textClassName: PropTypes.string,
    value: PropTypes.string.isRequired
}

CopyTextListItem.defaultProps = {
    className: null,
    handleClick: null,
    label: null,
    renderSecondaryActions: null,
    text: null,
    textClassName: null
}

export default CopyTextListItem
