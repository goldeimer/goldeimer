import React from 'react'
import uuid from 'react-uuid'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import NoResultsIcon from '@material-ui/icons/NotInterested'

import useSelectionByIndexKeyboardControlled, { AXES }
    from 'hooks/useSelectionByIndexKeyboardControlled'
import isFunction from 'util/isFunction'

import propTypesSelectionList, {
    defaultPropsSelectionList
} from 'propTypes/propTypesSelectionList'

const SelectionList = ({
    dense,
    itemIcon,
    items,
    noOptionsText,
    onItemClick,
    onSelect,
    showNoteOnEmpty
}) => {
    const {
        selectedIndex,
        handleSelect
    } = useSelectionByIndexKeyboardControlled(
        [AXES.vertical],
        items,
        onSelect
    )

    if (!items.length && !showNoteOnEmpty) {
        return <></>
    }

    return (
        <List
            component="nav"
            dense
        >
            {items.length
                ? items.map(
                    ({ label }, index) => (
                        <ListItem
                            button
                            key={uuid()}
                            onClick={() => {
                                const selectedValue = handleSelect(index)

                                if (isFunction(onItemClick)) {
                                    onItemClick(selectedValue)
                                }
                            }}
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
                            />
                        </ListItem>
                    )
                ) : (
                    <ListItem disabled>
                        <ListItemIcon>
                            <NoResultsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Keine Ergebnisse."
                        />
                    </ListItem>
                )
            }
        </List>
    )
}

SelectionList.propTypes = propTypesSelectionList

SelectionList.defaultProps = defaultPropsSelectionList

export default SelectionList
