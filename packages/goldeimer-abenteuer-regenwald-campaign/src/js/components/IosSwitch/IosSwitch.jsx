import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
    checked: {},
    focusVisible: {},
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1)
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 'none'
            }
        },
        '&$focusVisible $thumb': {
            color: theme.palette.primary.main,
            border: '6px solid #fff'
        }
    },
    thumb: {
        width: 24,
        height: 24
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border'])
    }
}))

const IosSwitch = (props) => {
    const classes = useStyles()

    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                checked: classes.checked,
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track
            }}
            {...props}
        />
    )
}

export default IosSwitch
