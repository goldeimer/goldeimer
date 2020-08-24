import React from 'react'

import uuid from 'react-uuid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import useSelectionByIndexKeyboardControlled
    from 'hooks/useSelectionByIndexKeyboardControlled'

import propTypesSelectionList, {
    defaultPropsSelectionList
} from 'propTypes/propTypesSelectionList'

const SelectionList = ({
    dense,
    itemIcon,
    items,
    noOptionsText,
    onSelect,
    onSubmit
}) => {
    const {
        selectedIndex,
        handleSubmit
    } = useSelectionByIndexKeyboardControlled(items, onSubmit)

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
                                onClick={() => (handleSubmit(index))}
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

SelectionList.defaultProps = defaultPropsSelectionList

export default SelectionList
