import React from 'react';

import FilterListIcon from '@material-ui/icons/FilterList';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';


const ACTIONS = {
    location: {
        icon: <LocationSearchingIcon />,
        id: 'location',
        label: 'In deiner Nähe',
    },
    filter: {
        icon: <FilterListIcon />,
        id: 'filter',
        label: 'Auswahl einschränken',
    },
    list: {
        icon: <ViewListIcon />,
        id: 'list',
        label: 'Händler Liste',
    },
    search: {
        icon: <SearchIcon />,
        id: 'search',
        label: 'Händler suchen',
    },
};


export default ACTIONS;
