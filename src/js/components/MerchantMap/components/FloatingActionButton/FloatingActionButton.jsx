import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';


const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));


const FloatingActionButton = ({ actions, setAction, openIcon = null }) =>
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = (event) =>
    {
        console.log(event);
        setOpen(false);
        // setAction()
    };

    const handleClose = () =>
    {
        setOpen(false);
    };

    const handleOpen = () =>
    {
        setOpen(true);
    };

    return (
        <SpeedDial
            ariaLabel=""
            className={classes.speedDial}
            icon={<SpeedDialIcon openIcon={openIcon} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction='up'
        >
            {
                Object.entries(actions).map(
                    ([key, action]) =>
                    (
                        <SpeedDialAction
                            icon={action.icon}
                            key={action.id}
                            onClick={handleClick}
                            // TODO:
                            // Would need refining of logic *and* styling.
                            // tooltipOpen={! window.USER_CAN_HOVER}
                            tooltipTitle={action.label}
                        />
                    )
                )
            }
        </SpeedDial>
    );
};


FloatingActionButton.propTypes = {
    actions: PropTypes.objectOf(
        PropTypes.exact({
            icon: PropTypes.element,
            // TODO: Compare against enum of available actions, validate values.
            id: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
    openIcon: PropTypes.oneOfType(
        PropTypes.node,
        PropTypes.null
    ),
};


export default FloatingActionButton;
