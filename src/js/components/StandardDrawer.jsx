import React from 'react'
import PropTypes from 'prop-types'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import useDialog from 'hooks/useDialog'
import isIos from 'util/isIos'

import StandardDialog from 'components/StandardDialog'
import StandardDialogTitle from 'components/StandardDialogTitle'

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

    const iOS = isIos()

    return (
        <SwipeableDrawer
            anchor="left"
            disableDiscovery={iOS}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            transitionDuration={500}
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
