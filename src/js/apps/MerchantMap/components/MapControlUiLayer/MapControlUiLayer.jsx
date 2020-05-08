import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import { ThemeProvider } from '@material-ui/core/styles'
import MapIcon from '@material-ui/icons/Map'

import muiTheme from 'config/muiTheme'

import FloatingActionButton from
    'components/FloatingActionButton/FloatingActionButton'

import VIEWS from './views'

const MapControlUiLayer = () => (
    <ThemeProvider theme={muiTheme}>
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
    </ThemeProvider>
)

export default MapControlUiLayer
