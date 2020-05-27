import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    const { paper } = theme.palette.background

    return {
        popper: {
            zIndex: theme.zIndex.modal,
            '&[x-placement*="bottom"] $arrow': {
                top: 0,
                left: 0,
                marginTop: '-0.9em',
                width: '3em',
                height: '1em',
                '&::before': {
                    borderWidth: '0 1em 1em 1em',
                    borderColor: `transparent transparent ${paper} transparent`
                }
            },
            '&[x-placement*="top"] $arrow': {
                bottom: 0,
                left: 0,
                marginBottom: '-0.9em',
                width: '3em',
                height: '1em',
                '&::before': {
                    borderWidth: '1em 1em 0 1em',
                    borderColor: `${paper} transparent transparent transparent`
                }
            },
            '&[x-placement*="right"] $arrow': {
                left: 0,
                marginLeft: '-0.9em',
                height: '3em',
                width: '1em',
                '&::before': {
                    borderWidth: '1em 1em 1em 0',
                    borderColor: `transparent ${paper} transparent transparent`
                }
            },
            '&[x-placement*="left"] $arrow': {
                right: 0,
                marginRight: '-0.9em',
                height: '3em',
                width: '1em',
                '&::before': {
                    borderWidth: '1em 0 1em 1em',
                    borderColor: `transparent transparent transparent ${paper}`
                }
            }
        },
        arrow: {
            position: 'absolute',
            fontSize: 7,
            width: '3em',
            height: '3em',
            '&::before': {
                content: '""',
                margin: 'auto',
                display: 'block',
                width: 0,
                height: 0,
                borderStyle: 'solid'
            }
        }
    }
})

const ArrowPopper = ({ anchorEl, children, isOpen }) => {
    const [arrowRef, setArrowRef] = useState(null)
    const classes = useStyles()

    return (
        <Popper
            anchorEl={anchorEl}
            className={classes.popper}
            disablePortal
            modifiers={{
                arrow: {
                    enabled: true,
                    element: arrowRef
                },
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'scrollParent'
                },
                flip: {
                    enabled: true
                }
            }}
            open={isOpen}
            placement="top"
            role="presentation"
            transition
        >
            <span className={classes.arrow} ref={setArrowRef} />
            {children}
        </Popper>
    )
}

ArrowPopper.propTypes = {
    anchorEl: PropTypes.oneOfType([
        PropTypes.instanceOf(Element),
        PropTypes.func
    ]),
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool
}

ArrowPopper.defaultProps = {
    anchorEl: null,
    isOpen: false
}

export default ArrowPopper
