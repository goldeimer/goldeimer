import { DATE_FORMAT } from '@gs/config'

/* eslint-disable no-undef */
const formatDate = (...args) => Utilities.formatDate(...args)

const getUuid = () => Utilities.getUuid()
/* eslint-enable no-undef */

const dateNow = () => formatDate(
    new Date(),
    'UTC',
    DATE_FORMAT
)

export {
    dateNow,
    formatDate,
    getUuid
}
