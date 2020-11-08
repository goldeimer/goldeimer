/* eslint-disable no-undef */
const getUserPropertyStore = () => PropertiesService.getUserProperties()

const deleteUserProperty = (
    key
) => getUserPropertyStore().deleteProperty(key)

const getUserProperties = () => getUserPropertyStore().getProperties()

const getUserProperty = (
    key,
    defaultValue = null
) => {
    const value = getUserPropertyStore().getProperty(key)

    return value || defaultValue
}

const setUserProperty = (
    key,
    value
) => getUserPropertyStore().setProperty(key, value)

/* eslint-enable no-undef */

export {
    deleteUserProperty,
    getUserProperties,
    getUserProperty,
    getUserPropertyStore,
    setUserProperty
}
