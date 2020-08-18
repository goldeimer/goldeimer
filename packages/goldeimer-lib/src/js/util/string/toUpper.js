import { isString } from 'typechecker'

const toUpper = (str, shouldCapitalize = true) => {
    if (!isString(str)) {
        return ''
    }

    return shouldCapitalize
        ? str.toUpperCase()
        : str
}

export default toUpper
