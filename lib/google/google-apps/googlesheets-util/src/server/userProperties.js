import {
    CrudOperation
} from '../enum'

import {
    getUserProperties
} from '@gs/server/gsService'

const USER_CrudOperation_PROPERTY_KEYS = [
    'currentCrudOperation',
    'currentTableName'
]

const getUserCrudOperationProperties = () => {
    const userProperties = getUserProperties()

    return USER_CrudOperation_PROPERTY_KEYS.reduce((acc, key) => ({
        ...acc,
        [key]: userProperties.getProperty(key)
    }), {})
}

const setUserCrudOperationProperties = (properties = {}) => {
    if (!properties) {
        return
    }

    const userProperties = getUserProperties()

    USER_CrudOperation_PROPERTY_KEYS.forEach((key) => {
        const value = properties[key]

        if (value !== undefined) {
            userProperties.setProperty(key, value)
        }
    })
}

const unsetUserCrudOperationProperties = () => {
    setUserCrudOperationProperties({
        currentCrudOperation: CrudOperation.read,
        currentTableName: ''
    })
}

export {
    getUserCrudOperationProperties,
    setUserCrudOperationProperties,
    unsetUserCrudOperationProperties
}
