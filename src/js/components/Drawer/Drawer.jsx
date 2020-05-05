import React from 'react';
import { PropTypes } from 'prop-types';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import useCloseableRoutedOverlay from 'hooks/useCloseableRoutedOverlay';


const Drawer = ({
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


Drawer.propTypes = {
    children: PropTypes.node.isRequired,
    routeOnClose: PropTypes.string,
};


export default Drawer;
