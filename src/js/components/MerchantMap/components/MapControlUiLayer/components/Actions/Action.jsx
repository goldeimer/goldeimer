import React from 'react';
import { Redirect, useParams, } from 'react-router-dom';

import { ACTION_IDS } from './Actions';
import LargeContentDialog from 'components/LargeContentDialog/LargeContentDialog';
import FeatureTable from './components/FeatureTable/FeatureTable';


const Action = () =>
{
    const { actionId } = useParams();

    switch (actionId)
    {
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
