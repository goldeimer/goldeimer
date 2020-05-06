import React, { forwardRef, useState, } from 'react'
import { PropTypes } from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import CloseButton from 'components/CloseButton/CloseButton'

import useCloseableRoutedOverlay, { closeableRoutedOverlayPropTypes } from
    'hooks/useCloseableRoutedOverlay'


const StandardDialog = ({
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

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby={title ? 'dialog-title' : null}
        >
            <DialogTitle id="dialog-title">
                {title}
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
    {
        title: PropTypes.string,
    },
    closeableRoutedOverlayPropTypes
);


export default StandardDialog;

