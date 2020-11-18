import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    const dimensions = theme.spacing(3)

    return {
        root: {
            display: 'flex',
            flexShrink: 0
        },
        img: {
            height: dimensions,
            width: dimensions
        }
    }
})

const RasterIcon = ({ src }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <img alt="" className={classes.img} src={src} />
        </div>
    )
}

RasterIcon.propTypes = {
    src: PropTypes.string.isRequired
}

export default RasterIcon
