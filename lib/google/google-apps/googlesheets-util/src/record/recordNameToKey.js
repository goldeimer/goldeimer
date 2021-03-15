const recordNameToKey = (name) => (
    name.split(/([a-z](?=[A-Z]))|(\s*)/)
        .join('-').toLowerCase()
)

export default recordNameToKey
