import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { debounce } from 'throttle-debounce'

import Box from '@material-ui/core/Box'

import { setProximityMarker } from 'actions/mapActions'
import useShallowEqualSelector from 'hooks/useShallowEqualSelector'
import useViewportEdgeStyles from 'styles/useViewportEdgeStyles'

import GeocodingAutocomplete from 'components/map/GeocodingAutocomplete'

import VIEW_ID from 'enum/views'

const SearchContainer = () => {
    const dispatch = useDispatch()
    const proximityMarker = useShallowEqualSelector(
        (state) => (state.marker.proximity)
    )

    const dispatchSetProximityMarker = (selectedItem) => {
        dispatch(
            setProximityMarker(selectedItem)
        )
    }

    const debouncedDispatchSetProximityMarker = debounce(
        800,
        dispatchSetProximityMarker
    )

    const classes = useViewportEdgeStyles()
    const history = useHistory()

    return (
        <Box className={classes.topLeft}>
            <GeocodingAutocomplete
                recentProximityMarkers={
                    proximityMarker ? [proximityMarker] : null
                }
                onMenuClick={() => { history.push(`/${VIEW_ID.menu}`) }}
                onSelect={debouncedDispatchSetProximityMarker}
                onSubmit={dispatchSetProximityMarker}
            />
        </Box>
    )
}

export default SearchContainer
