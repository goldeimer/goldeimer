import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import isIos from '@lib/detection/isIos'

import { useContext } from '@map/context'
import { latLonToCoordinates } from '@map/util/geometry'

import ContextSection from '@map/context/ContextSection'
import NearBySection from '@map/context/NearBySection'

const useStyles = makeStyles(({ palette, spacing, zIndex }) => {
    const collapseButtonWidth = spacing(2)

    // height of `AutoCompleteSearchBox` + margins
    const headerSectionMinHeight = spacing(8)
    // width of `AutoCompleteSearchBox` + margins
    const minDrawerWidth = 400 + spacing(2)

    return {
        root: {
            width: minDrawerWidth,
            maxWidth: '90%',
            right: 'auto !important',
            zIndex: `${zIndex.mobileStepper} !important`
        },
        paper: {
            width: minDrawerWidth,
            maxWidth: '90%',
            overflowY: 'visible'
        },
        // collapseButton: {
        //     position: 'absolute',
        //     width: collapseButtonWidth,
        //     height: spacing(4),
        //     right: -collapseButtonWidth,
        //     top: headerSectionMinHeight + spacing(1)
        //     // backgroundColor: palette.background.paper
        // },
        // collapseButtonFocusVisible: {

        // },
        // collapseIcon: {
        //     color: palette.action.active
        // },
        // collapsePaper: {
        //     borderRadius: 0,
        //     width: '100%',
        //     height: '100%',
        //     zIndex: zIndex.mobileStepper - 1
        // },
        headerSection: {
            minHeight: headerSectionMinHeight,
            backgroundColor: palette.primary.main
        }
    }
})

const ContextDrawer = ({ isOpenIfContext }) => {
    const classes = useStyles()

    const context = useContext()
    const { hasContext, latitude, longitude, type } = context

    const [isOpen, setIsOpen] = useState(
        isOpenIfContext && hasContext
    )

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <SwipeableDrawer
                anchor='left'
                className={classes.root}
                keepMounted
                ModalProps={{
                    hideBackdrop: true
                }}
                onClose={handleClose}
                onOpen={handleOpen}
                open={isOpen}
                PaperProps={{
                    className: classes.paper,
                    elevation: 6
                }}
            >
                {/* <ButtonBase
                    focusRipple
                    className={classes.collapseButton}
                    focusVisibleClassName={classes.collapseButtonFocusVisible}
                    onClick={handlecollapseButtonClick}
                >
                    <Paper
                        className={classes.collapsePaper}
                        elevation={6}
                    >
                        {isOpen
                            ? <ArrowLeftIcon />
                            : <ArrowRightIcon />}
                    </Paper>
                </ButtonBase> */}
                <ContextSection {...context} context={context} />
                <Divider />
                <NearBySection
                    contextType={type}
                    latitude={latitude}
                    longitude={longitude}
                />
            </SwipeableDrawer>
        </div>
    )
}

ContextDrawer.propTypes = {
    isOpenIfContext: PropTypes.bool
}

ContextDrawer.defaultProps = {
    isOpenIfContext: true
}

export default ContextDrawer
