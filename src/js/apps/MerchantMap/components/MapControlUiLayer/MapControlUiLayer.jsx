import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import MapIcon from '@material-ui/icons/Map'

import FloatingActionButton from
    'components/FloatingActionButton/FloatingActionButton'

import VIEWS from './views'

const MapControlUiLayer = () => (
    <Router>
        <Switch>
            {
                Object.entries(VIEWS).map(
                    ([key, view]) => (
                        <Route key={key} path={`/${key}`}>
                            <view.Container
                                title={view.title}
                                titleIcon={<view.Icon />}
                            />
                        </Route>
                    )
                )
            }
            <Route path="/">
                <FloatingActionButton
                    actions={VIEWS}
                    openIcon={<MapIcon />}
                />
            </Route>
        </Switch>
    </Router>
)

export default MapControlUiLayer
