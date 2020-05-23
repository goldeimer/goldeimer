import React from 'react'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import useCloseableRoutedOverlay from 'hooks/useCloseableRoutedOverlay'
import isIos from 'util/isIos'

import StandardDialogTitle
    from 'components/StandardDialogTitle'

import propTypesTitledCloseableRoutedOverlay from
    'propTypes/propTypesTitledCloseableRoutedOverlay'

/* eslint-disable react/prop-types */
const StandardDrawer = ({
    children,
    isDense = false,
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
            <StandardDialogTitle
                icon={titleIcon}
                isDense={isDense}
                onClose={handleClose}
                text={title}
            />
            {children}
        </SwipeableDrawer>
    )
}

StandardDrawer.propTypes = propTypesTitledCloseableRoutedOverlay

export default StandardDrawer
