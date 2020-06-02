import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'

import SelectionList from '@lib/components/SelectionList'

const useStyles = makeStyles((theme) => ({
    popperModalChild: {
        zIndex: theme.zIndex.tooltip
    }
}))

const ListBoxPopper = ({
    anchorEl,
    ...props
}) => {
    const classes = useStyles()

    return (
        <Popper
            anchorEl={anchorEl}
            className={classes.popperModalChild}
            open
            role='presentation'
            style={{
                width: anchorEl ? anchorEl.clientWidth : null
            }}
        >
            <Paper>
                <SelectionList
                    {...props}
                />
            </Paper>
        </Popper>
    )
}

ListBoxPopper.propTypes = {
    ...SelectionList.propTypes,
    anchorEl: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]).isRequired
}

export default ListBoxPopper
