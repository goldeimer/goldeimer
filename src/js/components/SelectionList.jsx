import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import NoResultsIcon from '@material-ui/icons/NotInterested'

import useSelectionByIndexKeyboardControlled
    from 'hooks/useSelectionByIndexKeyboardControlled'
import isFunction from 'utilities/isFunction'

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
        items,
        onSelect
    )

    if (!items.length && !showNoteOnEmpty) {
        return <></>
    }

    return (
        <List
            component='nav'
            dense
        >
            {items.length
                ? items.map(
                    ({ id, label }, index) => (
                        <ListItem
                            button
                            key={id}
                            onClick={() => {
                                const selectedValue = handleSelect(index)

                                if (isFunction(onItemClick)) {
                                    onItemClick(selectedValue)
                                }
                            }}
                            role='menuitem'
                            selected={selectedIndex === index}
                        >
                            {
                                itemIcon && (
                                    <ListItemIcon>
                                        {itemIcon}
                                    </ListItemIcon>
                                )
                            }
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
                            primary='Keine Ergebnisse.'
                        />
                    </ListItem>
                )}
        </List>
    )
}

SelectionList.propTypes = {
    dense: PropTypes.bool,
    itemIcon: PropTypes.node,
    items: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            label: PropTypes.string,
            value: PropTypes.any
        })
    ),
    noOptionsText: PropTypes.string,
    onItemClick: PropTypes.func,
    onSelect: PropTypes.func,
    showNoteOnEmpty: PropTypes.bool
}

SelectionList.defaultProps = {
    dense: true,
    itemIcon: null,
    items: [],
    noOptionsText: 'Keine Ergebnisse.',
    onItemClick: null,
    onSelect: null,
    showNoteOnEmpty: true
}

export default SelectionList
