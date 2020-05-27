import { createSelector } from 'reselect'

import filterFeatures from 'util/map/filterFeatures'

const selectFeatures = (state) => (state.features.all)
const selectSelectedTerms = (state) => (state.settings.filter.selectedTerms)

const selectFilteredFeatures = createSelector(
    [
        selectFeatures,
        selectSelectedTerms
    ],
    filterFeatures
)

export default selectFilteredFeatures
