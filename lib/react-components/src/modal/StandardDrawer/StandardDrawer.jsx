import React from 'react'
import PropTypes from 'prop-types'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import { useDialog } from '@goldeimer/react-util'
import { isIos } from '@goldeimer/js-util'

import StandardDialog from '../StandardDialog'
import StandardDialogTitle from '../StandardDialogTitle'

const StandardDrawer = ({
    children,
    isDense,
    routeOnClose,
    isInitiallyOpen,
    title,
    titleIcon
}) => {
    const {
        isOpen,
        handleClose,
        handleOpen
    } = useDialog(isInitiallyOpen)

    return (
        <SwipeableDrawer
            anchor="left"
            disableDiscovery={isIos()}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            transitionDuration={300}
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

StandardDrawer.propTypes = {
    ...StandardDialog.propTypes,
    isDense: PropTypes.bool
}

StandardDrawer.defaultProps = {
    ...StandardDialog.defaultProps,
    isDense: true
}

export default StandardDrawer
