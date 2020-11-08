import { makeEnum } from '@lib/enum'

const {
    enum: RELATIONSHIP_TYPE,
    valueToName
} = makeEnum([
    'child',
    'parent',
    'primary',
    'secondary'
], 'RelationshipType')

export {
    RELATIONSHIP_TYPE as default,
    valueToName
}
