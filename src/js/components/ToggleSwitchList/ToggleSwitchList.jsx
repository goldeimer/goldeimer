import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import ToggleSwitchListItem from
    'components/ToggleSwitchListItem/ToggleSwitchListItem'

const useStyles = makeStyles((theme) => ({
    subheader: {
        lineHeight: `${theme.spacing(4.5)}px`,
        paddingTop: theme.spacing(0.5)
    }
}))

const ToggleSwitchList = ({
    handleItemChange,
    items,
    selectedItemIds,
    title,
    ...props
}) => {
    const classes = useStyles()

    return (
        <List
            dense
            subheader={(
                <ListSubheader
                    className={classes.subheader}
                >
                    {title}
                </ListSubheader>
            )}
            {...props}
        >
            {items.map(
                ({ itemKey, itemLabel }) => (
                    <ToggleSwitchListItem
                        handleChange={() => { handleItemChange(itemKey) }}
                        isSelected={selectedItemIds.includes(itemKey)}
                        itemKey={itemKey}
                        key={itemKey}
                        label={itemLabel}
                    />
                )
            )}
        </List>
    )
}

ToggleSwitchList.propTypes = {
    handleItemChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.exact({
            itemKey: PropTypes.string.isRequired,
            itemLabel: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired
}

export default ToggleSwitchList
