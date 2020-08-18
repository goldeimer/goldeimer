import { isString } from 'typechecker'

const capitalize = (str, shouldCapitalize = true) => {
    if (!isString(str)) {
        return ''
    }

    return shouldCapitalize
        ? str.charAt(0).toUpperCase() + str.slice(1)
        : str
}

export default capitalize
