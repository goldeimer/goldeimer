import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'

import SelectionList from 'components/SelectionList'

import propTypesSelectionList from 'propTypes/propTypesSelectionList'

const useStyles = makeStyles((theme) => ({
    popperModalChild: {
        zIndex: theme.zIndex.tooltip
    }
}))

/* eslint-disable react/prop-types */
const ListBoxPopper = ({
    anchorEl,
    ...selectionListProps
}) => {
    const classes = useStyles()

    return (
        <Popper
            anchorEl={anchorEl}
            className={classes.popperModalChild}
            open
            role="presentation"
            style={{
                width: anchorEl ? anchorEl.clientWidth : null
            }}
        >
            <Paper>
                <SelectionList
                    {...selectionListProps}
                />
            </Paper>
        </Popper>
    )
}

ListBoxPopper.propTypes = Object.assign(
    {
        anchorEl: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func
        ]).isRequired
    },
    propTypesSelectionList
)

export default ListBoxPopper
