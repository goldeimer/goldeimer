import React from 'react';
import { Redirect, useParams, } from 'react-router-dom';

import { ACTION_IDS } from './Actions';
import FeatureTable from './components/FeatureTable/FeatureTable';


const Action = () =>
{
    const { actionId } = useParams();

    switch (actionId)
    {
        case ACTION_IDS.list:
            return <FeatureTable />
            break;

        default:
            return <Redirect to={{pathname: '/'}} />;
    }
}


export default Action;
