import React from 'react'
import { PropTypes } from 'prop-types'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import useCloseableRoutedOverlay, { closeableRoutedOverlayPropTypes } from
    'hooks/useCloseableRoutedOverlay'


const StandardDrawer = ({
    children,
    isOpenInitially = true,
    routeOnClose = '/',
}) =>
{
    const [
        isOpen,
        setIsOpen,
        handleClose,
        handleOpen,
    ] = useCloseableRoutedOverlay(isOpenInitially);

    const iOS = (
        process.browser
        && /iPad|iPhone|iPod/.test(navigator.userAgent)
    );

    return (
        <SwipeableDrawer
            anchor="left"
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            {children}
        </SwipeableDrawer>
    );
};


StandardDrawer.propTypes = closeableRoutedOverlayPropTypes;


export default StandardDrawer;
