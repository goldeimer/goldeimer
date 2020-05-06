import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    popperModalChild: {
        zIndex: theme.zIndex.modal,
    },
}));


const ListBoxPopper = ({
    anchorEl,
    items,
    icon = null,
    noOptionsText = 'Keine Ergebnisse.',
}) =>
{
    const classes = useStyles();

    return (
        <Popper
            className={classes.popperModalChild}
            style={{
                width: anchorEl ? anchorEl.clientWidth : null,
            }}
            role="presentation"
            anchorEl={anchorEl}
            open
        >
            <Paper
                // className={classes.paper}
            >
                {
                    items.length > 0
                    ?
                    <List dense>
                        {
                            items.map(
                                ({label, value}, index) =>
                                (
                                    <ListItem key={`list-item-${index}`}>
                                    {
                                        icon
                                        &&
                                        <ListItemAvatar>
                                            <Avatar>{icon}</Avatar>
                                        </ListItemAvatar>
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
                    :
                    <div
                        // className={classes.noOptions}
                    >
                        {noOptionsText}
                    </div>
                }
            </Paper>
        </Popper>
    );
};


ListBoxPopper.propTypes = {
    anchorEl: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]).isRequired,
    icon: PropTypes.node,
    items: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        })
    ),
    noOptionsText: PropTypes.string,
};


export default ListBoxPopper;
