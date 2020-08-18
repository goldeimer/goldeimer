import {
    CRUD_OPERATION
} from '@gs/enum'

import {
    getUserProperties
} from '@gs/server/gsService'

const USER_CRUD_OPERATION_PROPERTY_KEYS = [
    'currentCrudOperation',
    'currentTableName'
]

const getUserCrudOperationProperties = () => {
    const userProperties = getUserProperties()

    return USER_CRUD_OPERATION_PROPERTY_KEYS.reduce((acc, key) => ({
        ...acc,
        [key]: userProperties.getProperty(key)
    }), {})
}

const setUserCrudOperationProperties = (properties = {}) => {
    if (!properties) {
        return
    }

    const userProperties = getUserProperties()

    USER_CRUD_OPERATION_PROPERTY_KEYS.forEach((key) => {
        const value = properties[key]

        if (value !== undefined) {
            userProperties.setProperty(key, value)
        }
    })
}

const unsetUserCrudOperationProperties = () => {
    setUserCrudOperationProperties({
        currentCrudOperation: CRUD_OPERATION.read,
        currentTableName: ''
    })
}

export {
    getUserCrudOperationProperties,
    setUserCrudOperationProperties,
    unsetUserCrudOperationProperties
}
