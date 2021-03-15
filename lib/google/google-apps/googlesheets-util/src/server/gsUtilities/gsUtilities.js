const defaultDateFormatTemplate = 'yyyy-MM-dd HH:mm:ss'

/* eslint-disable no-undef */
export const formatDate = (...args) => Utilities.formatDate(...args)

export const getUuid = () => Utilities.getUuid()
/* eslint-enable no-undef */

export const dateNow = (
    formatTemplate = defaultDateFormatTemplate
) => formatDate(
    new Date(),
    'UTC',
    formatTemplate
)
