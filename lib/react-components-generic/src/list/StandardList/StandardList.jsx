import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

const useStyles = makeStyles(() => ({
    root: {
        padding: 0
    }
}), { name: 'StandardList' })

const StandardList = ({ children, isDense }) => {
    const classes = useStyles()

    return (
        <List
            className={classes.root}
            dense={isDense}
        >
            {children}
        </List>
    )
}

StandardList.propTypes = {
    children: PropTypes.node,
    isDense: PropTypes.bool
}

StandardList.defaultProps = {
    children: null,
    isDense: true
}

export default StandardList
