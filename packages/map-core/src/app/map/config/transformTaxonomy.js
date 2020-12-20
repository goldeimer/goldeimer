import getTermIcon from './getTermIcon'

const convertTermIconIdToComponent = ({ iconId, ...term }) => ({
    ...term,
    iconComponent: getTermIcon(iconId)
})

const convertTermIconIdsToComponents = ({ terms, ...rest }) => ({
    ...rest,
    terms: terms.map((term) => convertTermIconIdToComponent(term))
})

export {
    convertTermIconIdToComponent,
    convertTermIconIdsToComponents
}
