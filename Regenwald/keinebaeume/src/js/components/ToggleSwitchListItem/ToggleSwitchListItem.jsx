import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'

import isIos from 'util/isIos'

import IosSwitch from 'components/IosSwitch/IosSwitch'

const useStyles = makeStyles((theme) => ({
    listItemText: {
        marginRight: theme.spacing(4)
    }
}))

const ToggleSwitchListItem = ({
    handleChange,
    isSelected,
    itemKey,
    label
}) => {
    const classes = useStyles()

    const nodeId = `label.${itemKey}`
    const switchProps = {
        'aria-labelledby': nodeId
    }

    const SwitchComponent = isIos() ? IosSwitch : Switch

    return (
        <ListItem
            button
            onClick={() => { handleChange(itemKey) }}
        >
            <ListItemText
                className={classes.listItemText}
                id={nodeId}
                primary={label}
            />
            <ListItemSecondaryAction>
                <SwitchComponent
                    checked={isSelected}
                    color="primary"
                    edge="end"
                    inputProps={switchProps}
                    onChange={() => { handleChange(itemKey) }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

ToggleSwitchListItem.propTypes = {
    handleChange: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    itemKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

export default ToggleSwitchListItem
