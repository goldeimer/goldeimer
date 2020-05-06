import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'

import useSelectionByIndex from 'hooks/useSelectionByIndex'

import propTypesSelectionList from 'propTypes/propTypesSelectionList'


const SelectionList = ({
    dense = true,
    itemIcon = null,
    items,
    noOptionsText = 'Keine Ergebnisse.',
    onSelect = null,
}) =>
{
    const {
        selectedIndex,
        handleSelect
    } = useSelectionByIndex(items, onSelect);

    if (items.length > 0)
    {
        return (
            <List
                component="nav"
                dense
            >
                {
                    items.map(
                        ({ label }, index) =>
                        (
                            <ListItem
                                button
                                key={`list-item-${index}`}
                                onClick={() => (handleSelect(index))}
                                selected={selectedIndex === index}
                            >
                                {
                                    itemIcon
                                    &&
                                    <ListItemIcon>
                                        {itemIcon}
                                    </ListItemIcon>
                                }
                                <ListItemText
                                    primary={label}
                                // secondary={}
                                />
                            </ListItem>
                        )
                    )
                }
            </List>
        );
    }

    return (
        <div>
            {noOptionsText}
        </div>
    );
};


SelectionList.propTypes = propTypesSelectionList;


export default SelectionList;
