import React from 'react';
import {
    Redirect,
    Route,
    Switch,
    useRouteMatch,
} from 'react-router-dom';

import FilterListIcon from '@material-ui/icons/FilterList';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';

import Action from './Action';


const ACTIONS = {
    location: {
        icon: <LocationSearchingIcon />,
        label: 'In deiner Nähe',
    },
    filter: {
        icon: <FilterListIcon />,
        label: 'Auswahl einschränken',
    },
    list: {
        icon: <ViewListIcon />,
        label: 'Händler Liste',
    },
    search: {
        icon: <SearchIcon />,
        label: 'Händler suchen',
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
