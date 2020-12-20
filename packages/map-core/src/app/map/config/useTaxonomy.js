import { useSelector } from 'react-redux'

import {
    selectPrimaryTaxonomy,
    selectSecondaryTaxonomy,
    selectMainTaxonomies
} from './selectTaxonomy'

import {
    convertTermIconIdsToComponents
} from './transformTaxonomy'

const useTaxonomySelector = (selector) => {
    const taxonomy = useSelector(selector)

    return convertTermIconIdsToComponents(taxonomy)
}

const usePrimaryTaxonomy = () => (
    useTaxonomySelector(selectPrimaryTaxonomy)
)

const useSecondaryTaxonomy = () => (
    useTaxonomySelector(selectSecondaryTaxonomy)
)

const useMainTaxonomies = () => {
    const taxonomies = useSelector(selectMainTaxonomies)

    // TODO:
    // Move to selector to benefit from selector caching.
    return Object.fromEntries(
        Object.entries(
            taxonomies
        ).map(([k, taxonomy]) => (
            [k, convertTermIconIdsToComponents(taxonomy)]
        ))
    )
}

export {
    usePrimaryTaxonomy,
    useSecondaryTaxonomy,
    useMainTaxonomies
}
