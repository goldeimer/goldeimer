import React from 'react'
import { PropTypes } from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    avatar: {
        marginRight: theme.spacing(1.5),
        display: 'inline-flex',
        verticalAlign: 'middle'
    }
}))

const TitleIcon = ({ children }) => {
    const classes = useStyles()

    return (
        <Avatar className={classes.avatar}>
            {children}
        </Avatar>
    )
}

TitleIcon.propTypes = {
    children: PropTypes.element.isRequired
}

export default TitleIcon
