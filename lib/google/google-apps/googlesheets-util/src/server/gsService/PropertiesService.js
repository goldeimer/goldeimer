/* eslint-disable no-undef */
export const getUserPropertyStore = () => PropertiesService.getUserProperties()

export const deleteUserProperty = (
    key
) => getUserPropertyStore().deleteProperty(key)

export const getUserProperties = () => getUserPropertyStore().getProperties()

export const getUserProperty = (
    key,
    defaultValue = null
) => {
    const value = getUserPropertyStore().getProperty(key)

    return value || defaultValue
}

export const setUserProperty = (
    key,
    value
) => getUserPropertyStore().setProperty(key, value)
/* eslint-enable no-undef */
