import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    iconButtonEdgeEnd: {
        marginLeft: theme.spacing(3)
    },
    iconButtonEdgeStart: {
        marginLeft: theme.spacing(3)
    }
}))

const CloseButton = ({
    edge,
    isDense,
    onClose
}) => {
    const classes = useStyles()

    return (
        <IconButton
            className={
                edge === 'end'
                    ? classes.iconButtonEdgeEnd
                    : edge === 'start'
                        ? classes.iconButtonEdgeStart
                        : ''
            }
            color="inherit"
            edge={edge}
            onClick={onClose}
            size={isDense ? 'small' : 'medium'}
            aria-label="close"
        >
            <CloseIcon />
        </IconButton>
    )
}

CloseButton.propTypes = {
    edge: PropTypes.string,
    isDense: PropTypes.bool,
    onClose: PropTypes.func.isRequired
}

CloseButton.defaultProps = {
    edge: 'end',
    isDense: false
}

export default CloseButton
