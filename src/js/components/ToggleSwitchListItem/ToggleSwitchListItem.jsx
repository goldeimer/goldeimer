import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
    listItemText: {
        marginRight: theme.spacing(4)
    }
}))

const ToggleSwitchListItem = ({
    handleChange,
    isSelected,
    itemId,
    label
}) => {
    const classes = useStyles()

    const nodeId = `label.${itemId}`
    const switchProps = {
        'aria-labelledby': nodeId
    }

    return (
        <ListItem
            button
            onClick={() => { handleChange(itemId) }}
        >
            <ListItemText
                className={classes.listItemText}
                id={nodeId}
                primary={label}
            />
            <ListItemSecondaryAction>
                <Switch
                    checked={isSelected}
                    color="primary"
                    edge="end"
                    inputProps={switchProps}
                    onChange={() => { handleChange(itemId) }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

ToggleSwitchListItem.propTypes = {
    handleChange: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    itemId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

export default ToggleSwitchListItem
