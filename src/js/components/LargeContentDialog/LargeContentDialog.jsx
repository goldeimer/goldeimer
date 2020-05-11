import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

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

import CloseButton from 'components/CloseButton/CloseButton'
import TitleIcon from 'components/TitleIcon/TitleIcon'

import useCloseableRoutedOverlay from 'hooks/useCloseableRoutedOverlay'

import propTypesTitledCloseableRoutedOverlay from
    'propTypes/propTypesTitledCloseableRoutedOverlay'

const FULLSCREEN_BREAKPOINT = 'md'
const MAX_WIDTH = 'xl'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },
    appBarTitle: {
        flex: 1
    },
    dialogContentZeroPadding: {
        padding: 0
    }
}))

const Transition = forwardRef(
    // TODO: arrow function
    (props, ref) => <Slide direction="up" ref={ref} {...props} />
)

/* eslint-disable react/prop-types */
const LargeContentDialog = ({
    children,
    isPadded = false,
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
                        <DialogTitle id="dialog-title">
                            {titleIcon && <TitleIcon>{titleIcon}</TitleIcon>}
                            {title}
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

LargeContentDialog.propTypes = Object.assign(
    {
        isPadded: PropTypes.bool
    },
    propTypesTitledCloseableRoutedOverlay
)

export default LargeContentDialog
