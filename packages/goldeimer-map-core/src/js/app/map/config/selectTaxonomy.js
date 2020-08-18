import { createStructuredSelector } from 'reselect'

const selectPrimaryTaxonomy = (state) => state.map.config.taxonomies.primary
const selectSecondaryTaxonomy = (state) => state.map.config.taxonomies.secondary

const selectMainTaxonomies = createStructuredSelector({
    primary: selectPrimaryTaxonomy,
    secondary: selectSecondaryTaxonomy
})

export {
    selectPrimaryTaxonomy,
    selectSecondaryTaxonomy,
    selectMainTaxonomies
}
