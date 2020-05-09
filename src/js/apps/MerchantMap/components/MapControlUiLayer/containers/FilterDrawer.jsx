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

import { filter_selectedTerms_toggleTerm } from 'actions/merchantMapActions'
import { makeKey, TAXONOMIES } from 'reducers/MerchantMap/filterReducer'

import StandardDrawer from 'components/StandardDrawer/StandardDrawer'

const useStyles = makeStyles((theme) => ({
    listItemText: {
        marginRight: theme.spacing(4)
    }
}))

const FilterDrawer = (props) => {
    const classes = useStyles()

    const selectedTerms = useSelector(
        (state) => (state.filter.selectedTerms)
    )

    const dispatch = useDispatch()

    const handleChange = (key) => {
        dispatch(
            filter_selectedTerms_toggleTerm(key)
        )
    }

    return (
        <StandardDrawer {...props}>
            {TAXONOMIES.map(
                ({ id: taxonomyId, title, terms }, index) => (
                    <Fragment key={taxonomyId}>
                        {index === 0 ? <Divider /> : null}
                        <List
                            dense
                            subheader={(
                                <ListSubheader>{title}</ListSubheader>
                            )}
                        >
                            {terms.map(
                                ({ id: termId, label }) => {
                                    const key = makeKey(taxonomyId, termId)
                                    const isSelected = (
                                        selectedTerms.includes(key)
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
