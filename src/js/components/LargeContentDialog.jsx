import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

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
import { makeStyles, useTheme } from '@material-ui/core/styles'

import CloseButton from 'components/CloseButton'
import TitleIcon from 'components/TitleIcon'

import useDialog from 'hooks/useDialog'

import StandardDialog, {
    STANDARD_DIALOG_STYLES
} from 'components/StandardDialog'

const FULLSCREEN_BREAKPOINT = 'md'
const MAX_WIDTH = 'xl'

const useStyles = makeStyles((theme) => ({
    ...STANDARD_DIALOG_STYLES,
    appBar: {
        position: 'relative'
    },
    appBarTitle: {
        display: 'flex',
        flex: 1
    },
    dialogContentZeroPadding: {
        padding: 0
    },
    paddingBottomZero: {
        paddingBottom: 0
    }
}))

const Transition = forwardRef(
    (props, ref) => <Slide direction="up" ref={ref} {...props} />
)

const LargeContentDialog = ({
    children,
    isPadded,
    routeOnClose,
    isInitiallyOpen,
    title,
    titleIcon
}) => {
    const {
        isOpen,
        handleClose
    } = useDialog(isInitiallyOpen)

    const classes = useStyles()
    const theme = useTheme()
    const useFullScreenVariant = useMediaQuery(
        theme.breakpoints.down(FULLSCREEN_BREAKPOINT)
    )

    return (
        <Dialog
            fullScreen={useFullScreenVariant}
            fullWidth={false}
            maxWidth={MAX_WIDTH}
            open={isOpen}
            onClose={handleClose}
            scroll="paper"
            TransitionComponent={useFullScreenVariant ? Transition : Fade}
            aria-labelledby={title ? 'dialog-title' : null}
        >
            {
                useFullScreenVariant
                    ? (
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    className={classes.appBarTitle}
                                >
                                    {titleIcon &&
                                        <TitleIcon>{titleIcon}</TitleIcon>
                                    }
                                    {title}
                                </Typography>
                                <CloseButton onClose={handleClose} />
                            </Toolbar>
                        </AppBar>
                    )
                    : (
                        <DialogTitle
                            className={clsx(
                                classes.dialogTitle,
                                classes.paddingBottomZero
                            )}
                            id="dialog-title"
                        >
                            {titleIcon && <TitleIcon>{titleIcon}</TitleIcon>}
                            <span className={classes.dialogTitleText}>
                                {title}
                            </span>
                            <CloseButton onClose={handleClose} />
                        </DialogTitle>
                    )
            }
            <DialogContent
                className={isPadded ? '' : classes.dialogContentZeroPadding}
            >
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Schließen
                </Button>
            </DialogActions>
        </Dialog>
    )
}

LargeContentDialog.propTypes = {
    ...StandardDialog.propTypes,
    isPadded: PropTypes.bool
}

LargeContentDialog.defaultProps = {
    ...StandardDialog.defaultProps,
    isPadded: false
}

export default LargeContentDialog
