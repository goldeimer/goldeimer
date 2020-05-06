import React, { forwardRef, useState, } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

import CloseButton from 'components/CloseButton/CloseButton'
import TitleIcon from 'components/TitleIcon/TitleIcon'

import useCloseableRoutedOverlay from
    'hooks/useCloseableRoutedOverlay'

import propTypesCloseableRoutedOverlay from
    'propTypes/propTypesCloseableRoutedOverlay'
import propTypesTitled from 'propTypes/propTypesTitled'


const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        '& h2': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    dialogTitleText: {
        flexGrow: 1,
    },
}));


const StandardDialog = ({
    children,
    isOpenInitially = true,
    routeOnClose = '/',
    title = null,
    titleIcon = null,
}) =>
{
    const [
        isOpen,
        setIsOpen,
        handleClose,
    ] = useCloseableRoutedOverlay(isOpenInitially);

    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            onClose={handleClose}
            aria-labelledby={title ? 'dialog-title' : null}
        >
            <DialogTitle
                className={classes.dialogTitle}
                id="dialog-title"
            >
                {titleIcon && <TitleIcon>{titleIcon}</TitleIcon>}
                <span className={classes.dialogTitleText}>
                    {title}
                </span>
                {<CloseButton onClose={handleClose}/>}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Abbrechen
                </Button>
            </DialogActions>
        </Dialog>
    );
};


StandardDialog.propTypes = Object.assign(
    propTypesCloseableRoutedOverlay,
    propTypesTitled
);


export default StandardDialog;

