import React from 'react'
import { Redirect, useParams, } from 'react-router-dom'

import { ACTION_IDS } from './Actions'
import FeatureTable from './components/FeatureTable/FeatureTable'
import LargeContentDialog from 'components/LargeContentDialog/LargeContentDialog'
import StandardDialog from 'components/StandardDialog/StandardDialog'
import StandardDrawer from 'components/StandardDrawer/StandardDrawer'



const Action = () =>
{
    const { actionId } = useParams();

    switch (actionId)
    {
        case ACTION_IDS.location:
            return (
                <StandardDialog
                    title='Finde Händler in deiner Nähe'
                >
                </StandardDialog>
            );
            break;

        case ACTION_IDS.filter:
            return (
                <StandardDrawer>
                    <FeatureTable />
                </StandardDrawer>
            );
            break;

        case ACTION_IDS.list:
            return (
                <LargeContentDialog title='Hier bekommst Du unsere Produkte'>
                    <FeatureTable />
                </LargeContentDialog>
            );
            break;

        default:
            return <Redirect to={{pathname: '/'}} />;
    }
}


export default Action;
