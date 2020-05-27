import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'

import isIos from 'util/isIos'

import IosSwitch from 'components/IosSwitch'

const useStyles = makeStyles((theme) => ({
    listItemText: {
        marginRight: theme.spacing(4)
    }
}))

const ToggleSwitchListItem = ({
    handleChange,
    iconComponent: IconComponent,
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
            {IconComponent && (
                <ListItemIcon>
                    <IconComponent size="small" />
                </ListItemIcon>
            )}
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
    iconComponent: PropTypes.elementType,
    isSelected: PropTypes.bool.isRequired,
    itemKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

ToggleSwitchListItem.defaultProps = {
    iconComponent: null
}

export default ToggleSwitchListItem
