import React from 'react';
import { useHistory } from 'react-router-dom';
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


const FloatingActionButton = ({
    actions,
    openIcon = null,
    routePathnamePrefix = '/action'
}) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClick = (actionId) =>
    {
        setOpen(false);
        history.push(`${routePathnamePrefix}/${actionId}`);
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
                    ([actionId, action]) =>
                    (
                        <SpeedDialAction
                            icon={action.icon}
                            key={actionId}
                            onClick={() => (handleClick(actionId))}
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
            label: PropTypes.string,
        })
    ).isRequired,
    openIcon: PropTypes.node,
    routePathnamePrefix: PropTypes.string,
};


export default FloatingActionButton;
