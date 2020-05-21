import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import FeatureList from './containers/FeatureList'
import MenuDrawer from './containers/MenuDrawer'
import SearchContainer from './containers/SearchContainer'

const MapControlUiLayer = () => (
    <Router>
        <Switch>
            <Route path="/menu">
                <MenuDrawer
                    title="Händler"
                />
            </Route>
            <Route path="/browse">
                <FeatureList
                    title="Hier bekommst Du unsere Produkte"
                />
            </Route>
            <Route path="/">
                <SearchContainer />
            </Route>
        </Switch>
    </Router>
)

export default MapControlUiLayer
