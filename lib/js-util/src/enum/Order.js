import makeEnum from './makeEnum'

const { enum: Order } = makeEnum([
    ['ASC', 'ascending'],
    ['DESC', 'descending']
], 'Order')

export default Order
