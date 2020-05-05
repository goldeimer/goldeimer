import React from 'react';

import FilterListIcon from '@material-ui/icons/FilterList';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';


const ACTIONS = {
    location: {
        component: <h1 style={{position: 'relative'}}>LOCATION</h1>,
        icon: <LocationSearchingIcon />,
        id: 'location',
        label: 'In deiner Nähe',
    },
    filter: {
        component: <h1 style={{position: 'relative'}}>FILTER</h1>,
        icon: <FilterListIcon />,
        id: 'filter',
        label: 'Auswahl einschränken',
    },
    list: {
        component: <h1 style={{position: 'relative'}}>LIST</h1>,
        icon: <ViewListIcon />,
        id: 'list',
        label: 'Händler Liste',
    },
    search: {
        component: <h1 style={{position: 'relative'}}>SEARCH</h1>,
        icon: <SearchIcon />,
        id: 'search',
        label: 'Händler suchen',
    },
};


const ACTION_IDS = Object.keys(ACTIONS);


export {
    ACTIONS as default,
    ACTION_IDS,
};
