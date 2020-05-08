import React from 'react'
import { useDispatch } from 'react-redux'

import LocationSearchingIcon from '@material-ui/icons/LocationSearching'

import { setProximityMarker } from 'actions/actionsMerchantMap'
import usePrevious from 'hooks/usePrevious'
import useShallowEqualSelector from 'hooks/useShallowEqualSelector'

import GeocodingAutocomplete from
    'components/GeocodingAutocomplete/GeocodingAutocomplete'
import StandardDialog from 'components/StandardDialog/StandardDialog'

const ProximityMarkerSelect = () => {
    const dispatch = useDispatch()
    const proximityMarker = useShallowEqualSelector(
        (state) => (state.proximityMarker)
    )
    const previousProximityMarker = usePrevious(proximityMarker)

    return (
        <StandardDialog
            shouldBeOpen={previousProximityMarker === undefined}
            title="Finde Händler in deiner Nähe"
            titleIcon={<LocationSearchingIcon />}
        >
            <GeocodingAutocomplete
                onSelect={
                    (selectedItem) => {
                        dispatch(
                            setProximityMarker(selectedItem)
                        )
                    }
                }
            />
        </StandardDialog>
    )
}

export default ProximityMarkerSelect
