import TAB_TERM from '@gs/schema/110-TabTerm'
import TAB_FEATURE from '@gs/schema/200-TabFeature'

import {
    makeRalationshipTable
} from './factory'

const TAB = makeRalationshipTable(
    TAB_FEATURE,
    TAB_TERM
)

export default TAB
