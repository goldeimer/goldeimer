import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import StandardTooltip from '@lib/components/modals/StandardTooltip'

import { useContext, CONTEXT_TYPE } from '@map/context'

import ContextSection from '@map/context/ContextSection'
import NearBySection from '@map/context/NearBySection'

const useStyles = makeStyles(({
    breakpoints,
    palette,
    spacing,
    zIndex
}) => {
    const collapseButtonWidth = spacing(3)
    const collapseButtonSpacing = spacing(1)

    // width of `AutoCompleteSearchBox` + margins
    const idealDrawerWidth = 400 + spacing(2)

    // the collapse button resides outside of its container element
    const idealDrawerWrapWidth = idealDrawerWidth +
        collapseButtonWidth +
        collapseButtonSpacing

    // height of `AutoCompleteSearchBox` + margins
    const headerSectionMinHeight = spacing(8)

    const rootWidths = {
        maxWidth: idealDrawerWrapWidth,
        [breakpoints.up('drawer')]: {
            width: idealDrawerWrapWidth
        }
    }

    return {
        root: {
            right: 'auto !important',
            zIndex: `${zIndex.mobileStepper} !important`,
            ...rootWidths
        },
        paperWrap: {
            background: 'transparent',
            zIndex: `${zIndex.mobileStepper} !important`,
            ...rootWidths
        },
        paper: {
            width: 'auto',
            maxWidth: `calc(100% - ${collapseButtonWidth + collapseButtonSpacing}px)`,
            minHeight: '100%',
            position: 'relative',
            fallbacks: {
                maxWidth: '90%'
            }
        },
        collapsePaper: {
            position: 'absolute',
            width: collapseButtonWidth,
            height: spacing(6),
            left: '100%',
            top: collapseButtonSpacing,
            zIndex: zIndex.mobileStepper - 1,
            display: 'flex',
            alignItems: 'center',
            color: palette.text.secondary,
            backgroundColor: palette.background.paper,
            borderLeft: '1px solid #d4d4d4'
        },
        collapseButton: {
            width: '100%',
            height: '100%',
            '&:hover': {
                backgroundColor: palette.action.hover
            }
        },
        collapseButtonFocusVisible: {

        },
        collapseIcon: {
            color: palette.action.active
        },
        headerSection: {
            minHeight: headerSectionMinHeight,
            backgroundColor: palette.primary.main
        }
    }
})

const ContextDrawer = ({ isOpenIfContext }) => {
    const classes = useStyles()

    const context = useContext()
    const { id, hasContext, latitude, longitude, setAt, type } = context

    const [isOpen, setIsOpen] = useState(
        isOpenIfContext && hasContext
    )

    const previousContextRef = useRef({
        id: null,
        setAt: null,
        type: CONTEXT_TYPE.noContext
    })

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (CONTEXT_TYPE.noContext.is(type)) {
            if (isOpen) {
                handleClose()
            }

            return
        }

        if (
            id !== previousContextRef.current.id ||
            setAt !== previousContextRef.current.setAt ||
            type !== previousContextRef.current.type
        ) {
            if (!isOpen) {
                handleOpen()
            }

            previousContextRef.current = { id, setAt, type }
        }
    }, [id, isOpen, previousContextRef, setAt, type])

    return (
        <SwipeableDrawer
            anchor='left'
            className={classes.root}
            keepMounted
            ModalProps={{
                disableAutoFocus: true,
                disableEnforceFocus: true,
                disableEscapeKeyDown: true,
                disableRestoreFocus: true,
                disableScrollLock: true,
                hideBackdrop: true
            }}
            onClose={handleClose}
            onOpen={handleOpen}
            open={isOpen}
            PaperProps={{
                className: classes.paperWrap,
                elevation: 0
            }}
        >
            <Paper
                className={classes.paper}
                elevation={6}
                square
            >
                <Paper
                    className={classes.collapsePaper}
                    elevation={4}
                    square
                >
                    <StandardTooltip
                        placement='right'
                        title={isOpen
                            ? 'Dialog minimieren'
                            : 'Detailansicht öffnen'}
                    >
                        <ButtonBase
                            focusRipple
                            className={classes.collapseButton}
                            focusVisibleClassName={
                                classes.collapseButtonFocusVisible
                            }
                            onClick={handleToggle}
                        >
                            {isOpen
                                ? <ArrowLeftIcon />
                                : <ArrowRightIcon />}
                        </ButtonBase>
                    </StandardTooltip>
                </Paper>
                <ContextSection {...context} context={context} />
                <Divider />
                <NearBySection
                    contextType={type}
                    latitude={latitude}
                    longitude={longitude}
                />
            </Paper>
        </SwipeableDrawer>
    )
}

ContextDrawer.propTypes = {
    isOpenIfContext: PropTypes.bool
}

ContextDrawer.defaultProps = {
    isOpenIfContext: true
}

export default ContextDrawer
