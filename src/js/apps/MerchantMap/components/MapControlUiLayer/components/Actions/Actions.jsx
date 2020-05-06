import React from 'react';
import {
    Redirect,
    Route,
    Switch,
    useRouteMatch,
} from 'react-router-dom';

import FilterListIcon from '@material-ui/icons/FilterList';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import ViewListIcon from '@material-ui/icons/ViewList';

import Action from './Action';


const ACTIONS = {
    list: {
        icon: <ViewListIcon />,
        label: 'Händler Liste',
    },
    filter: {
        icon: <FilterListIcon />,
        label: 'Auswahl einschränken',
    },
    locate: {
        icon: <LocationSearchingIcon />,
        label: 'In deiner Nähe',
    },
};


const ACTION_IDS = Object.fromEntries(
    Object.keys(ACTIONS).map(
        (actionId) => ([actionId, actionId])
    )
);


const Actions = () =>
{
    const routeMatch = useRouteMatch();

    return (
        <Switch>
            <Route path={`${routeMatch.path}/:actionId`}>
                <Action />
            </Route>
            <Route path={routeMatch.path}>
                <Redirect to={{pathname: '/'}} />
            </Route>
        </Switch>
    );
}


export {
    Actions as default,
    ACTIONS,
    ACTION_IDS,
};
