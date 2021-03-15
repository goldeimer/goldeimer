import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import {
    StandardDrawer,
    ToggleSwitchList
} from '@goldeimer/react-components'
import { useToggleStates } from '@goldeimer/react-util'

import TAXONOMIES from '../config/taxonomies'
import { selectFilter, FILTER } from '.'
import {
    FeatureBrowserIcon,
    FilterListIcon,
    MapIcon
} from '../icon'
import RouteSlug from '../routing'

const FilterMenu = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [isSubMenuClosed, toggleSubMenu] = useToggleStates()

    const selectedFilter = useSelector(selectFilter)

    const handleTermChange = (taxonomyId, termId) => {
        const taxonomyActions = FILTER[taxonomyId]

        if (taxonomyActions) {
            dispatch(taxonomyActions.toggle(termId))
        }
    }

    return (
        <StandardDrawer {...props} isDense>
            <Divider />
            <List
                component="nav"
                dense
            >
                <ListItem button onClick={() => { history.push('/') }}>
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Karte" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        history.push(`/${RouteSlug.BROWSE}`)
                    }}
                >
                    <ListItemIcon>
                        <FeatureBrowserIcon />
                    </ListItemIcon>
                    <ListItemText primary="Liste aller Einträge" />
                </ListItem>
            </List>
            <Divider />
            <List
                component="nav"
                dense
            >
                <ListItem
                    button
                    onClick={() => { toggleSubMenu('filter') }}
                >
                    <ListItemIcon className="tightest">
                        <FilterListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Auswahl einschränken" />
                    <Box pl={2} display="flex" alignItems="center">
                        {
                            isSubMenuClosed('filter')
                                ? <ExpandMore />
                                : <ExpandLess />
                        }
                    </Box>
                </ListItem>
                <Collapse
                    in={!isSubMenuClosed('filter')}
                    timeout="auto"
                    unmountOnExit
                >
                    {TAXONOMIES.map(
                        ({ taxonomyId, taxonomyName, terms }, index) => (
                            <Fragment key={taxonomyId}>
                                {
                                    index === 0
                                        ? null
                                        : <Divider light variant="middle" />
                                }
                                <ToggleSwitchList
                                    component="div"
                                    items={terms.map(({
                                        termId: itemKey,
                                        termName: label,
                                        iconComponent
                                    }) => ({
                                        itemKey,
                                        label,
                                        iconComponent: iconComponent || null
                                    }))}
                                    onChange={(termId) => handleTermChange(
                                        taxonomyId,
                                        termId
                                    )}
                                    selectedIds={selectedFilter[taxonomyId]}
                                    title={taxonomyName}
                                />
                            </Fragment>
                        )
                    )}
                </Collapse>
            </List>
            <Divider />
        </StandardDrawer>
    )
}

export default FilterMenu
