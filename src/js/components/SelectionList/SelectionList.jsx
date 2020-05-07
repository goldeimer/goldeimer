import React from 'react'

import uuid from 'react-uuid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import useSelectionByIndex from 'hooks/useSelectionByIndex'

import propTypesSelectionList from 'propTypes/propTypesSelectionList'

const SelectionList = ({
    dense = true,
    itemIcon = null,
    items,
    noOptionsText = 'Keine Ergebnisse.',
    onSelect = null
}) => {
    const {
        selectedIndex,
        handleSelect
    } = useSelectionByIndex(items, onSelect)

    if (items.length > 0) {
        return (
            <List
                component="nav"
                dense
            >
                {
                    items.map(
                        ({ label }, index) => (
                            <ListItem
                                button
                                key={uuid()}
                                onClick={() => (handleSelect(index))}
                                selected={selectedIndex === index}
                            >
                                {
                                    itemIcon && (
                                        <ListItemIcon>
                                            {itemIcon}
                                        </ListItemIcon>
                                    )}
                                <ListItemText
                                    primary={label}
                                    // secondary={}
                                />
                            </ListItem>
                        )
                    )
                }
            </List>
        )
    }

    return (
        <div>
            {noOptionsText}
        </div>
    )
}

SelectionList.propTypes = propTypesSelectionList

export default SelectionList
