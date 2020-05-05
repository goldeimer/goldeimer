import React, { forwardRef, useState, } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// fullScreen variant
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme, } from '@material-ui/core/styles';


const FULLSCREEN_BREAKPOINT = 'md';
const MAX_WIDTH = 'lg';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    appBarTitle: {
        flex: 1,
    },
}));


const Transition = forwardRef(
    // TODO: arrow function
    function Transition(props, ref)
    {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);


const LargeContentDialog = ({
    children,
    isOpenInitially = true,
    routeOnClose = '/',
    title = null,
}) =>
{
    const [isOpen, setIsOpen] = useState(isOpenInitially);

    const classes = useStyles();
    const theme = useTheme();
    const isFullScreen = useMediaQuery(
        theme.breakpoints.down(FULLSCREEN_BREAKPOINT)
    );
    const history = useHistory();

    const handleClose = () =>
    {
        setIsOpen(false);

        if (routeOnClose)
        {
            history.push(routeOnClose);
        }
    };

    const renderCloseButton = () =>
    (
        <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
        >
            <CloseIcon />
        </IconButton>
    );

    return (
        <Dialog
            fullScreen={isFullScreen}
            fullWidth={false}
            maxWidth={MAX_WIDTH}
            open={isOpen}
            onClose={handleClose}
            scroll="paper"
            TransitionComponent={isFullScreen ? Transition : Fade}
            aria-labelledby={title ? 'dialog-title' : null}
        >
            {
                isFullScreen
                ? <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            className={classes.appBarTitle}
                        >
                            {title}
                        </Typography>
                        {renderCloseButton()}
                    </Toolbar>
                </AppBar>
                : <DialogTitle id="dialog-title">
                    {title}
                    {renderCloseButton()}
                </DialogTitle>
            }
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Schließen
                </Button>
            </DialogActions>
        </Dialog>
    );
};


LargeContentDialog.propTypes = {
    children: PropTypes.node.isRequired,
    isOpenInitially: PropTypes.bool,
    routeOnClose: PropTypes.string,
    title: PropTypes.string,
};


export default LargeContentDialog;
