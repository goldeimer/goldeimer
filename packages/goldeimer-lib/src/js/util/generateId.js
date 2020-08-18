import generate from 'nanoid-generate/nolookalikes'

const generateId = (size = 15) => generate(size)
const generateShortId = () => generateId(10)

export {
    generateId as default,
    generateShortId
}
