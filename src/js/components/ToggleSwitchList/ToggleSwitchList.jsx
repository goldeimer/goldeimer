import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import ToggleSwitchListItem from
    'components/ToggleSwitchListItem/ToggleSwitchListItem'

const ToggleSwitchList = ({
    handleItemChange,
    items,
    selectedItemIds,
    title
}) => (
    <List
        dense
        subheader={(<ListSubheader>{title}</ListSubheader>)}
    >
        {items.map(
            ({ itemKey, label }) => (
                <ToggleSwitchListItem
                    handleChange={() => { handleItemChange(itemKey) }}
                    isSelected={selectedItemIds.includes(itemKey)}
                    itemKey={itemKey}
                    key={itemKey}
                    label={label}
                />
            )
        )}
    </List>
)

ToggleSwitchList.propTypes = {
    handleItemChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.exact({
            itemKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired
}

export default ToggleSwitchList
