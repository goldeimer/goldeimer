import React from 'react'
import { Route, useParams } from 'react-router-dom'

import { getTheme } from 'config/theme'

import ListIcon from 'components/icons/ui/ListIcon'
import VIEW_ID from 'enum/views'
import FeatureList from './components/FeatureList'
import MenuDrawer from './components/MenuDrawer'
import SearchContainer from './components/SearchContainer'

const { logoIconComponent: LogoIconComponent } = getTheme()

const Views = () => {
    const { viewId } = useParams()

    return (
        <>
            <MenuDrawer
                title="Händlerkarte"
                isInitiallyOpen={viewId === VIEW_ID.menu}
                titleIcon={<LogoIconComponent />}
            />
            <FeatureList
                title="Liste aller Einträge"
                isInitiallyOpen={viewId === VIEW_ID.browse}
                titleIcon={<ListIcon />}
            />
        </>
    )
}

const UiLayer = () => (
    <>
        <Route path="/:viewId">
            <Views />
        </Route>
        <SearchContainer />
    </>
)

export default UiLayer
