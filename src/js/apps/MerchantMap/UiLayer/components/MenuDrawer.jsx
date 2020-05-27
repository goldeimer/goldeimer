import React, { Fragment, useState } from 'react'
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

import { toggleTerm } from 'actions/merchantMapActions'
import TAXONOMIES from 'enum/taxonomies'

import StandardDrawer from 'components/StandardDrawer'
import ToggleSwitchList from 'components/ToggleSwitchList'

import FilterIcon from 'components/icons/ui/FilterIcon'
import ListIcon from 'components/icons/ui/ListIcon'
import MapIcon from 'components/icons/ui/MapIcon'

import VIEW_ID from 'enum/views'

const MenuDrawer = (props) => {
    const [openSubMenus, setOpenSubMenus] = useState({})

    const isSubMenuOpen = (subMenuId) => (
        openSubMenus[subMenuId] !== false
    )

    const handleSubMenuItemClick = (subMenuId) => {
        const nextState = !isSubMenuOpen(subMenuId)

        setOpenSubMenus({
            ...openSubMenus,
            [subMenuId]: nextState
        })
    }

    const selectedTerms = useSelector(
        (state) => (state.settings.filter.selectedTerms)
    )

    const dispatch = useDispatch()
    const history = useHistory()

    const handleTermChange = (taxonomyId, termId) => {
        dispatch(toggleTerm(taxonomyId, termId))
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
                        history.push(`/${VIEW_ID.browse}`)
                    }}
                >
                    <ListItemIcon>
                        <ListIcon />
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
                    onClick={() => { handleSubMenuItemClick('filter') }
                    }
                >
                    <ListItemIcon>
                        <FilterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Auswahl einschränken" />
                    <Box pl={2} display="flex" alignItems="center">
                        {
                            isSubMenuOpen('filter')
                                ? <ExpandLess />
                                : <ExpandMore />
                        }
                    </Box>
                </ListItem>
                <Collapse
                    in={isSubMenuOpen('filter')}
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
                                    handleItemChange={
                                        (termId) => (
                                            handleTermChange(taxonomyId, termId)
                                        )
                                    }
                                    items={terms.map(({
                                        termId: itemKey,
                                        termName: label,
                                        iconComponent
                                    }) => ({
                                        itemKey,
                                        label,
                                        iconComponent: iconComponent || null
                                    }))}
                                    selectedItemIds={selectedTerms[taxonomyId]}
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
