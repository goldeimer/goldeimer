import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

import CloseButton from 'components/CloseButton'
import TitleIcon from 'components/TitleIcon'

import useCloseableRoutedOverlay from
    'hooks/useCloseableRoutedOverlay'

import propTypesTitledCloseableRoutedOverlay from
    'propTypes/propTypesTitledCloseableRoutedOverlay'

const STANDARD_DIALOG_STYLES = {
    dialogTitle: {
        '& h2': {
            display: 'flex',
            alignItems: 'center'
        }
    },
    dialogTitleText: {
        flexGrow: 1
    }
}

const useStyles = makeStyles((theme) => (STANDARD_DIALOG_STYLES))

/* eslint-disable react/prop-types */
const StandardDialog = ({
    children,
    routeOnClose = '/',
    shouldBeOpen = true,
    title = null,
    titleIcon = null
}) => {
    const {
        isOpen,
        handleClose
    } = useCloseableRoutedOverlay(shouldBeOpen)

    const classes = useStyles()

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
                <CloseButton onClose={handleClose} />
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
    )
}

StandardDialog.propTypes = propTypesTitledCloseableRoutedOverlay

export {
    StandardDialog as default,
    STANDARD_DIALOG_STYLES
}
