import React, { forwardRef } from 'react'
import { PropTypes } from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
// fullScreen variant
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme, } from '@material-ui/core/styles'

import CloseButton from 'components/CloseButton/CloseButton'

import useCloseableRoutedOverlay, { closeableRoutedOverlayPropTypes } from
    'hooks/useCloseableRoutedOverlay'


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
    const [
        isOpen,
        setIsOpen,
        handleClose,
    ] = useCloseableRoutedOverlay(isOpenInitially);

    const classes = useStyles();
    const theme = useTheme();
    const isFullScreen = useMediaQuery(
        theme.breakpoints.down(FULLSCREEN_BREAKPOINT)
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
                        {<CloseButton onClose={handleClose}/>}
                    </Toolbar>
                </AppBar>
                : <DialogTitle id="dialog-title">
                    {title}
                    {<CloseButton onClose={handleClose}/>}
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


LargeContentDialog.propTypes = Object.assign(
    {
        title: PropTypes.string,
    },
    closeableRoutedOverlayPropTypes
);


export default LargeContentDialog;
