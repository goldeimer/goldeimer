import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

import CloseButton from 'components/CloseButton'
import TitleIcon from 'components/TitleIcon'

import useDialog from 'hooks/useDialog'

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

const StandardDialog = ({
    children,
    routeOnClose,
    shouldBeOpen,
    title,
    titleIcon
}) => {
    const {
        isOpen,
        handleClose
    } = useDialog(shouldBeOpen)

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

StandardDialog.propTypes = {
    children: PropTypes.node.isRequired,
    routeOnClose: PropTypes.string,
    shouldBeOpen: PropTypes.bool,
    title: PropTypes.string.isRequired,
    titleIcon: PropTypes.node
}

StandardDialog.defaultProps = {
    routeOnClose: '/',
    shouldBeOpen: true,
    titleIcon: null
}

export {
    StandardDialog as default,
    STANDARD_DIALOG_STYLES
}
