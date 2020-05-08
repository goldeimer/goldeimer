import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

import FilterListIcon from '@material-ui/icons/FilterList'
import ViewListIcon from '@material-ui/icons/ViewList'

import LargeContentDialog from
    'components/LargeContentDialog/LargeContentDialog'
import StandardDrawer from 'components/StandardDrawer/StandardDrawer'

import { ACTION_ID } from 'apps/MerchantMap/enum'

import ProximityMarkerSelectDialog from
    './containers/ProximityMarkerSelectDialog'

// TODO: Dynamic copy.
const Action = () => {
    const { actionId } = useParams()

    switch (actionId) {
    case ACTION_ID.locate:
        return (
            <ProximityMarkerSelectDialog />
        )

    case ACTION_ID.filter:
        return (
            <StandardDrawer
                title="Auswahl einschränken"
                titleIcon={<FilterListIcon />}
            >
                <h1>FILTER</h1>
            </StandardDrawer>
        )

    case ACTION_ID.list:
        return (
            <LargeContentDialog
                title="Hier bekommst Du unsere Produkte"
                titleIcon={<ViewListIcon />}
            >
                <h1>TABLE</h1>
            </LargeContentDialog>
        )

    default:
        return <Redirect to={{ pathname: '/' }} />
    }
}

export default Action
