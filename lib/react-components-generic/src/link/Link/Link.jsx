import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import MuiLink from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
    inherit: {
        '&:active, &:focus, &:hover': {
            color: theme.palette.primary.main
        }
    },
    flex: {
        display: 'flex'
    }
}))

const Link = ({
    children, isFlex, variant, ...props
}) => {
    // TODO:
    // Add a switch() and more variants.
    const classes = useStyles()
    const color = 'inherit'

    return (
        <MuiLink
            className={clsx(classes.inherit, isFlex && classes.flex)}
            color={color}
            {...props}
        >
            {children}
        </MuiLink>
    )
}

Link.propTypes = {
    children: PropTypes.node.isRequired,
    isFlex: PropTypes.bool,
    variant: PropTypes.string
}

Link.defaultProps = {
    variant: 'inherit',
    isFlex: false
}

export default Link
