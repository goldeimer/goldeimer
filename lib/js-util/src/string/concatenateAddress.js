const concatenateAddress = ({
    city = '',
    postCode = '',
    street = ''
}) => [street, `${postCode} ${city}`.trim()].filter(
    (part) => Boolean(part)
).join(', ')

export default concatenateAddress
