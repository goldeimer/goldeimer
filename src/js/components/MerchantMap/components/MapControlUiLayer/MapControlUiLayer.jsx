import React, { useEffect, useState, } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { ThemeProvider, } from '@material-ui/core/styles';
import MapIcon from '@material-ui/icons/Map';

import muiTheme from 'config/muiTheme';

import FloatingActionButton from
    'components/FloatingActionButton/FloatingActionButton'

import ACTIONS from './components/actions/actions';


const reduceActionsForFab = (actions) =>
(
    Object.fromEntries(
        Object.entries(actions).map(
            ([actionId, {icon, label}]) => ([actionId, {icon, label}])
        )
    )
);


const MapControlUiLayer = () =>
{
    const [currentAction, setCurrentAction] = useState(null);

    return (
        <ThemeProvider theme={muiTheme}>
            <Router>
                <Switch>
                    {
                        Object.entries(ACTIONS).map(
                            ([actionId, action]) =>
                            (
                                <Route
                                    key={actionId}
                                    path={`/${actionId}`}
                                >
                                    {action.component}
                                </Route>
                            )
                        )
                    }
                    <Route path="/">
                        <FloatingActionButton
                            actions={reduceActionsForFab(ACTIONS)}
                            openIcon={<MapIcon />}
                            setAction={setCurrentAction}
                        />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
};


export default MapControlUiLayer;
