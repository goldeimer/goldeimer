import { makeEnum } from '@goldeimer/js-util'

const {
    enum: RelationshipType,
    valueToName
} = makeEnum([
    'child',
    'parent',
    'primary',
    'secondary'
], 'RelationshipType')

export {
    RelationshipType as default,
    valueToName
}
