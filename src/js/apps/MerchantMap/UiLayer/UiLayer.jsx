import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import FeatureList from './components/FeatureList'
import MenuDrawer from './components/MenuDrawer'
import SearchContainer from './components/SearchContainer'

const UiLayer = () => (
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

export default UiLayer
