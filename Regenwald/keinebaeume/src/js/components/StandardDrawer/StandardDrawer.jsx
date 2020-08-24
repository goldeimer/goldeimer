import React from 'react'

import DialogTitle from '@material-ui/core/DialogTitle'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import useCloseableRoutedOverlay from 'hooks/useCloseableRoutedOverlay'
import isIos from 'util/isIos'

import CloseButton from 'components/CloseButton/CloseButton'
import TitleIcon from 'components/TitleIcon/TitleIcon'

import propTypesTitledCloseableRoutedOverlay from
    'propTypes/propTypesTitledCloseableRoutedOverlay'

/* eslint-disable react/prop-types */
const StandardDrawer = ({
    children,
    routeOnClose = '/',
    shouldBeOpen = true,
    title = null,
    titleIcon = null
}) => {
    const {
        isOpen,
        handleClose,
        handleOpen
    } = useCloseableRoutedOverlay(shouldBeOpen)

    const iOS = isIos()

    return (
        <SwipeableDrawer
            anchor="left"
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            <DialogTitle
                id="dialog-title"
            >
                {titleIcon && <TitleIcon>{titleIcon}</TitleIcon>}
                <span>
                    {title}
                </span>
                <CloseButton onClose={handleClose} />
            </DialogTitle>
            {children}
        </SwipeableDrawer>
    )
}

StandardDrawer.propTypes = propTypesTitledCloseableRoutedOverlay

export default StandardDrawer

//{titleIcon && <TitleIcon>{titleIcon}</TitleIcon>}
