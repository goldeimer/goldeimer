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

import { ACTION } from 'apps/MerchantMap/enum'

import ActionSwitch from './components/ActionSwitch/ActionSwitch'

const MapControlUiLayer = () => (
    <ThemeProvider theme={muiTheme}>
        <Router>
            <Switch>
                <Route path="/action">
                    <ActionSwitch />
                </Route>
                <Route path="/">
                    <FloatingActionButton
                        actions={ACTION}
                        openIcon={<MapIcon />}
                    />
                </Route>
            </Switch>
        </Router>
    </ThemeProvider>
)

export default MapControlUiLayer
