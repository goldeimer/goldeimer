import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { isFunction } from 'typechecker'
import { makeStyles } from '@material-ui/core/styles'

import useSelectionByIndexKeyboardControlled
    from '@lib/hooks/useSelectionByIndexKeyboardControlled'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import NoResultsIcon from '@material-ui/icons/NotInterested'

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'auto'
    }
}))

const SelectionList = ({
    classes,
    dense,
    defaultItemIcon,
    items,
    noOptionsText,
    onItemClick,
    onSelect,
    renderItemIcon,
    showNoteOnEmpty
}) => {
    const baseClasses = useStyles()

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
            className={clsx(baseClasses.root, classes.maximums || {})}
            component='nav'
            dense={dense}
        >
            {items.length
                ? items.map(
                    ({ label, value }, index) => (
                        <ListItem
                            button
                            key={value.id}
                            onClick={() => {
                                const selectedValue = handleSelect(index)

                                if (isFunction(onItemClick)) {
                                    onItemClick(selectedValue)
                                }
                            }}
                            role='menuitem'
                            selected={selectedIndex === index}
                        >
                            {(defaultItemIcon || renderItemIcon) && (
                                <ListItemIcon>
                                    {
                                        renderItemIcon
                                            ? renderItemIcon(value)
                                            : defaultItemIcon
                                    }
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
                            primary={noOptionsText}
                        />
                    </ListItem>
                )}
        </List>
    )
}

SelectionList.propTypes = {
    classes: PropTypes.shape({
        maximums: PropTypes.string
    }),
    dense: PropTypes.bool,
    defaultItemIcon: PropTypes.node,
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
    renderItemIcon: PropTypes.func,
    showNoteOnEmpty: PropTypes.bool
}

SelectionList.defaultProps = {
    classes: {},
    dense: true,
    defaultItemIcon: null,
    items: [],
    noOptionsText: 'Keine Ergebnisse.',
    onItemClick: null,
    onSelect: null,
    renderItemIcon: null,
    showNoteOnEmpty: true
}

export default SelectionList
