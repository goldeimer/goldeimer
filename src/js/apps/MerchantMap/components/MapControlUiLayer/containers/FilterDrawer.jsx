import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import { toggleTerm } from 'actions/merchantMapActions'
import TAXONOMIES, {
    makeCombinedTaxonomyTermId
} from 'reducers/MerchantMap/taxonomies'

import StandardDrawer from 'components/StandardDrawer/StandardDrawer'
import ToggleSwitchListItem from
    'components/ToggleSwitchListItem/ToggleSwitchListItem'

const FilterDrawer = (props) => {
    const selectedTerms = useSelector(
        (state) => (state.settings.selectedTerms)
    )

    const dispatch = useDispatch()

    const handleChange = (key) => {
        dispatch(toggleTerm(key))
    }

    return (
        <StandardDrawer {...props}>
            {TAXONOMIES.map(
                ({ id: taxonomyId, title, terms }, index) => (
                    <Fragment key={taxonomyId}>
                        {index === 0 ? <Divider /> : null}
                        <List
                            dense
                            subheader={(
                                <ListSubheader>{title}</ListSubheader>
                            )}
                        >
                            {terms.map(
                                ({ id: termId, label }) => {
                                    const key = makeCombinedTaxonomyTermId(
                                        taxonomyId,
                                        termId
                                    )

                                    return (
                                        <ToggleSwitchListItem
                                            handleChange={
                                                () => { handleChange(key) }
                                            }
                                            isSelected={
                                                selectedTerms.includes(key)
                                            }
                                            itemId={key}
                                            key={key}
                                            label={label}
                                        />
                                    )
                                }
                            )}
                        </List>
                        <Divider />
                    </Fragment>
                )
            )}
        </StandardDrawer>
    )
}

export default FilterDrawer
