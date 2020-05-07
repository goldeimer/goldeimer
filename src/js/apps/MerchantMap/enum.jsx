/// @brief Top-level enumerations.
///
/// Employed for filtering map markers / results.
///
/// TODO(Johannes):
/// Make dynamic, define on the backend side (once we have one).

import React from 'react'

import FilterListIcon from '@material-ui/icons/FilterList'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import ViewListIcon from '@material-ui/icons/ViewList'

/// ---------------------------------- util -----------------------------------

const makeEnumObject = (id, label) => ({
    id,
    label
})

const makeIdEnum = (objectEnum) => Object.fromEntries(
    Object.entries(objectEnum).map(
        ([key, object]) => ([key, object.id])
    )
)

/// ------------------------------- entry enums -------------------------------

const BRAND = {
    Goldeimer: makeEnumObject('goldeimer', 'Goldeimer'),
    VivaConAgua: makeEnumObject('vca', 'Viva con Agua')
}

const BRAND_ID = makeIdEnum(BRAND)

const MERCHANT_TYPE = {
    Retail: makeEnumObject('retail', 'Einzelhandel'),
    Wholesale: makeEnumObject('wholesale', 'Großhandel'),
    DeliveryService: makeEnumObject('delivery', 'Lieferservice'),
    OnlineShop: makeEnumObject('online', 'Online Shop')
}

const MERCHANT_TYPE_ID = makeIdEnum(MERCHANT_TYPE)

/// ------------------------- user interaction enums --------------------------

const ACTION = {
    list: {
        icon: <ViewListIcon />,
        label: 'Händler Liste'
    },
    filter: {
        icon: <FilterListIcon />,
        label: 'Auswahl einschränken'
    },
    locate: {
        icon: <LocationSearchingIcon />,
        label: 'In deiner Nähe'
    }
}

const ACTION_ID = Object.fromEntries(
    Object.keys(ACTION).map(
        (actionId) => ([actionId, actionId])
    )
)

export {
    ACTION,
    ACTION_ID,
    BRAND,
    BRAND_ID,
    MERCHANT_TYPE,
    MERCHANT_TYPE_ID
}
