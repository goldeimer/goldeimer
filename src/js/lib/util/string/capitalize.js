import { isString } from 'typechecker'

const capitalize = (str) => {
    if (!isString(str)) {
        return ''
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export default capitalize
