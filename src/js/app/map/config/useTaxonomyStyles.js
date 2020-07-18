import { makeStyles } from '@material-ui/core/styles'

import { COLOR_FALLBACK } from '@map/config/taxonomies'

import {
    usePrimaryTaxonomy,
    useSecondaryTaxonomy,
    useMainTaxonomies
} from '@map/config/useTaxonomy'

const makeTermRules = (
    termId,
    termColor = COLOR_FALLBACK
) => ({
    [`${termId}-background`]: {
        backgroundColor: termColor.main,
        color: termColor.contrastText
    },
    [`${termId}-background-light`]: {
        backgroundColor: termColor.light,
        color: termColor.contrastText
    },
    [`${termId}-background-dark`]: {
        backgroundColor: termColor.dark,
        color: termColor.contrastText
    },
    [`${termId}-background-currentContext`]: {
        backgroundColor: termColor.dark,
        color: termColor.contrastText
    },
    [`${termId}-color`]: {
        color: termColor.main
    },
    [`${termId}-color-light`]: {
        color: termColor.light
    },
    [`${termId}-color-dark`]: {
        color: termColor.dark
    },
    [`${termId}-color-currentContext`]: {
        color: termColor.dark
    }
})

const makeTermsRules = (terms) => (
    terms.reduce((
        acc,
        { color: termColor, termId }
    ) => ({
        ...acc,
        ...makeTermRules(termId, termColor)
    }), {})
)

const useClasses = (terms) => {
    const useStyles = makeStyles(() => makeTermsRules(terms))

    return useStyles()
}

const useTaxonomyStyles = (useTaxonomyHook) => {
    const { terms } = useTaxonomyHook()

    return useClasses(terms)
}

const usePrimaryTaxonomyStyles = () => (
    useTaxonomyStyles(usePrimaryTaxonomy)
)

const useSecondaryTaxonomyStyles = () => (
    useTaxonomyStyles(useSecondaryTaxonomy)
)

const useMainTaxonomiesStyles = () => {
    const {
        primary: { terms: primaryTerms },
        secondary: { terms: secondaryTerms }
    } = useMainTaxonomies()

    return {
        primary: useClasses(primaryTerms),
        secondary: useClasses(secondaryTerms)
    }
}

export {
    usePrimaryTaxonomyStyles,
    useSecondaryTaxonomyStyles,
    useMainTaxonomiesStyles
}
