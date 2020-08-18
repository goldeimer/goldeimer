import makeEnum from '@lib/enum/makeEnum'

const { enum: ORDER } = makeEnum([
    ['asc', 'ascending'],
    ['desc', 'descending']
], 'Order')

export default ORDER
