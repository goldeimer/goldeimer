import React from 'react'
import {
    Redirect,
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom'

import Action from './Action'

const ActionSwitch = () => {
    const routeMatch = useRouteMatch()

    return (
        <Switch>
            <Route path={`${routeMatch.path}/:actionId`}>
                <Action />
            </Route>
            <Route path={routeMatch.path}>
                <Redirect to={{ pathname: '/' }} />
            </Route>
        </Switch>
    )
}

export default ActionSwitch
