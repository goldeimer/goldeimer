import generate from 'nanoid-generate/nolookalikes'

const generateId = (size = 15) => generate(size)

export default generateId
