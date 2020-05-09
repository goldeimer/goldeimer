import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'

import { toggleFilterItem } from 'actions/actionsMerchantMap'
import { makeKey, TAXONOMIES } from 'reducers/MerchantMap/selectedFilterItems'

import StandardDrawer from 'components/StandardDrawer/StandardDrawer'

const useStyles = makeStyles((theme) => ({
    listItemText: {
        marginRight: theme.spacing(4)
    }
}))

const FilterDrawer = (props) => {
    const classes = useStyles()

    const selectedFilterItems = useSelector(
        (state) => (state.selectedFilterItems)
    )

    const dispatch = useDispatch()

    const handleChange = (key) => {
        dispatch(
            toggleFilterItem(key)
        )
    }

    return (
        <StandardDrawer {...props}>
            {TAXONOMIES.map(
                ({ id: taxonomyId, title, items }, index) => (
                    <Fragment key={taxonomyId}>
                        {index === 0 ? <Divider /> : null}
                        <List
                            dense
                            subheader={(
                                <ListSubheader>{title}</ListSubheader>
                            )}
                        >
                            {items.map(
                                ({ id: itemId, label }) => {
                                    const key = makeKey(taxonomyId, itemId)
                                    const isSelected = (
                                        selectedFilterItems.includes(key)
                                    )
                                    const nodeId = `taxonomy-item.${key}`
                                    const switchProps = {
                                        'aria-labelledby': nodeId
                                    }

                                    return (
                                        <ListItem
                                            button
                                            key={key}
                                            onClick={
                                                () => {
                                                    handleChange(key)
                                                }
                                            }
                                        >
                                            <ListItemText
                                                className={
                                                    classes.listItemText
                                                }
                                                id={nodeId}
                                                primary={label}
                                            />
                                            <ListItemSecondaryAction>
                                                <Switch
                                                    checked={isSelected}
                                                    color="primary"
                                                    edge="end"
                                                    inputProps={switchProps}
                                                    onChange={
                                                        () => {
                                                            handleChange(key)
                                                        }
                                                    }
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }
                            )}
                        </List>
                        <Divider />
                    </Fragment>
                )
            )}
        </StandardDrawer>
    )
}

export default FilterDrawer
