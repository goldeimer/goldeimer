const ERROR_TYPE = {
    default: 'ERROR'
}

const errorWrapper = (
    func,
    {
        message = null,
        successType = null,
        type = ERROR_TYPE.default
    } = {}
) => (dispatch) => func(dispatch).catch((error) => dispatch(
    {
        type, error, message, successType
    }
))

export {
    errorWrapper as default,
    ERROR_TYPE
}
