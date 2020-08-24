import FilterListIcon from '@material-ui/icons/FilterList'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import ViewListIcon from '@material-ui/icons/ViewList'

import FeatureList from './containers/FeatureList'
import FilterDrawer from './containers/FilterDrawer'
import ProximityMarkerSelectDialog from
    './containers/ProximityMarkerSelectDialog'

const VIEWS = {
    list: {
        label: 'Händler Liste',
        title: 'Hier bekommst Du unsere Produkte',
        Container: FeatureList,
        Icon: ViewListIcon
    },
    filter: {
        label: 'Auswahl einschränken',
        title: 'Auswahl einschränken',
        Container: FilterDrawer,
        Icon: FilterListIcon
    },
    locate: {
        label: 'In deiner Nähe',
        title: 'Finde Händler in deiner Nähe',
        Container: ProximityMarkerSelectDialog,
        Icon: LocationSearchingIcon
    }
}

export default VIEWS
