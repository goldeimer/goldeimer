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

import useToggleStates from 'hooks/useToggleStates'

import StandardDrawer from 'components/StandardDrawer'
import ToggleSwitchList from 'components/ToggleSwitchList'

import FilterIcon from 'components/icons/ui/FilterIcon'
import ListIcon from 'components/icons/ui/ListIcon'
import MapIcon from 'components/icons/ui/MapIcon'

import ACTIONS from 'slices/app'
import TAXONOMIES from 'enum/taxonomies'
import VIEW_ID from 'enum/views'

const MenuDrawer = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [isSubMenuClosed, toggleSubMenu] = useToggleStates()

    const selectedFilter = useSelector((state) => (state.map.filter))

    const handleTermChange = (taxonomyId, termId) => {
        const taxonomyActions = ACTIONS.map.filter[taxonomyId]

        if (taxonomyActions) {
            dispatch(taxonomyActions.toggle(termId))
        }
    }

    return (
        <StandardDrawer {...props} isDense>
            <Divider />
            <List
                component='nav'
                dense
            >
                <ListItem button onClick={() => { history.push('/') }}>
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary='Karte' />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        history.push(`/${VIEW_ID.browse}`)
                    }}
                >
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary='Liste aller Einträge' />
                </ListItem>
            </List>
            <Divider />
            <List
                component='nav'
                dense
            >
                <ListItem
                    button
                    onClick={() => { toggleSubMenu('filter') }}
                >
                    <ListItemIcon>
                        <FilterIcon />
                    </ListItemIcon>
                    <ListItemText primary='Auswahl einschränken' />
                    <Box pl={2} display='flex' alignItems='center'>
                        {
                            isSubMenuClosed('filter')
                                ? <ExpandMore />
                                : <ExpandLess />
                        }
                    </Box>
                </ListItem>
                <Collapse
                    in={!isSubMenuClosed('filter')}
                    timeout='auto'
                    unmountOnExit
                >
                    {TAXONOMIES.map(
                        ({ taxonomyId, taxonomyName, terms }, index) => (
                            <Fragment key={taxonomyId}>
                                {
                                    index === 0
                                        ? null
                                        : <Divider light variant='middle' />
                                }
                                <ToggleSwitchList
                                    component='div'
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

export default MenuDrawer
