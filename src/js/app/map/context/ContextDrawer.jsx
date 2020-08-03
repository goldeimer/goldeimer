import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import SimpleBarReact from 'simplebar-react'

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import StandardTooltip from '@lib/components/modals/StandardTooltip'

import { useContext, CONTEXT_TYPE } from '@map/context'

import ContextSection from '@map/context/ContextSection'
import NearBySection from '@map/context/NearBySection'

import 'simplebar/dist/simplebar.min.css'

const useStyles = makeStyles(({
    breakpoints,
    palette,
    spacing,
    zIndex
}) => {
    const collapseButtonWidth = spacing(3)

    // width of `AutoCompleteSearchBox` + margins
    const idealDrawerWidth = 400 + spacing(2)

    // the collapse button resides outside of its container element
    const idealDrawerWrapWidth = idealDrawerWidth + collapseButtonWidth

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
        headerSpacer: ({ color }) => ({
            // height of `AutoCompleteSearchBox` + margins
            minHeight: spacing(8),
            backgroundColor: color && color.light
                ? color.light
                : palette.primary.light
        }),
        paperWrap: {
            background: 'transparent',
            zIndex: `${zIndex.mobileStepper} !important`,
            height: '100%',
            overflow: 'hidden',
            ...rootWidths
        },
        paper: {
            width: 'auto',
            maxWidth: `calc(100% - ${collapseButtonWidth}px)`,
            height: '100%',
            position: 'relative',
            fallbacks: {
                maxWidth: '90%'
            }
        },
        maxHeight100: {
            maxHeight: '100%'
        },
        flexWrapper: {
            height: '100%'
        },
        collapsePaper: {
            position: 'absolute',
            width: collapseButtonWidth,
            height: spacing(6),
            left: '100%',
            top: spacing(1),
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
        // TODO:
        // Remove. Not needed, if FocusRipple does its thing.
        collapseButtonFocusVisible: {},
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
    const context = useContext()
    const {
        color,
        id,
        hasContext,
        latitude,
        longitude,
        setAt,
        type
    } = context

    const classes = useStyles({ color })

    const shouldScrollNearBySectionOnly = useMediaQuery('(min-height:700px)')

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

    const scrollable = (
        <>
            <ContextSection {...context} context={context} />
            <Divider />
            <NearBySection
                contextId={id}
                contextType={type}
                latitude={latitude}
                longitude={longitude}
                isScrollEnabled={shouldScrollNearBySectionOnly}
            />
        </>
    )

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
                <Box
                    display='flex'
                    flexDirection='column'
                    className={classes.flexWrapper}
                >
                    <Box flexGrow={0}>
                        <div className={classes.headerSpacer} />
                        <Divider />
                    </Box>
                    <Box
                        flexGrow={1}
                        position='relative'
                    >
                        <Box
                            position='absolute'
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                        >
                            {shouldScrollNearBySectionOnly
                                ? (
                                    <div className={classes.maxHeight100}>
                                        {scrollable}
                                    </div>
                                ) : (
                                    <SimpleBarReact
                                        style={{ maxHeight: '100%' }}
                                    >
                                        {scrollable}
                                    </SimpleBarReact>
                                )}
                        </Box>
                    </Box>
                </Box>
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
