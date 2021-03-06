import { TabTerm } from './110-TabTerm'
import { TabFeature } from './200-TabFeature'

import {
    makeRalationshipTable
} from './factory'

export const TabFeature2Term = makeRalationshipTable(
    TabFeature,
    TabTerm
)
