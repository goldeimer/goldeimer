import React from 'react'
import { Redirect, useParams, } from 'react-router-dom'

import FilterListIcon from '@material-ui/icons/FilterList';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import ViewListIcon from '@material-ui/icons/ViewList';

import LargeContentDialog from 'components/LargeContentDialog/LargeContentDialog'
import StandardDialog from 'components/StandardDialog/StandardDialog'
import StandardDrawer from 'components/StandardDrawer/StandardDrawer'

import FeatureTable from './components/FeatureTable/FeatureTable'
import GeocodingAutocomplete from
    './components/GeocodingAutocomplete/GeocodingAutocomplete'

import { ACTION_ID } from './Actions'


// TODO: Dynamic copy.
const Action = () =>
{
    const { actionId } = useParams();

    switch (actionId)
    {
        case ACTION_ID.locate:
            return (
                <StandardDialog
                    title="Finde Händler in deiner Nähe"
                    titleIcon={<LocationSearchingIcon />}
                >
                    <GeocodingAutocomplete />
                </StandardDialog>
            );
            break;

        case ACTION_ID.filter:
            return (
                <StandardDrawer
                    title="Auswahl einschränken"
                    titleIcon={<FilterListIcon />}
                >
                    <FeatureTable />
                </StandardDrawer>
            );
            break;

        case ACTION_ID.list:
            return (
                <LargeContentDialog
                    title="Hier bekommst Du unsere Produkte"
                    titleIcon={<ViewListIcon />}
                >
                    <FeatureTable />
                </LargeContentDialog>
            );
            break;

        default:
            return <Redirect to={{pathname: '/'}} />;
    }
}


export default Action;
