/// Stub:
/// Sans backend, taxonomies are fixed.
/// Code further up is written as if not.

import { createSegment } from '@lib/redux'

import {
    getPrimaryTaxonomy,
    getSecondaryTaxonomy
} from '@map/config/taxonomies'

const DEFAULT_TAXONOMIES = {
    primary: getPrimaryTaxonomy(),
    secondary: getSecondaryTaxonomy(),
    common: {}
}

const config = createSegment({
    name: 'config',
    slices: {
        taxonomies: {
            initialState: DEFAULT_TAXONOMIES
        }
    }
})

export {
    /* eslint-disable-next-line import/prefer-default-export */
    config
}
