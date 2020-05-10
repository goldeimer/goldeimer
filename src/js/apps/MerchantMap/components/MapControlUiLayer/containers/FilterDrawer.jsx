import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@material-ui/core/Divider'

import { toggleTerm } from 'actions/merchantMapActions'
import TAXONOMIES from 'reducers/MerchantMap/taxonomies'

import StandardDrawer from 'components/StandardDrawer/StandardDrawer'
import ToggleSwitchList from 'components/ToggleSwitchList/ToggleSwitchList'

const FilterDrawer = (props) => {
    const selectedTerms = useSelector(
        (state) => (state.settings.filter.selectedTerms)
    )

    const dispatch = useDispatch()

    const handleTermChange = (termId) => {
        dispatch(toggleTerm(termId))
    }

    return (
        <StandardDrawer {...props}>
            {TAXONOMIES.map(
                ({ taxonomyId, title, terms }, index) => (
                    <Fragment key={taxonomyId}>
                        {index === 0 ? <Divider /> : null}
                        <ToggleSwitchList
                            handleItemChange={handleTermChange}
                            items={terms.map(({ taxonomyTermId, label }) => ({
                                itemKey: taxonomyTermId,
                                label
                            }))}
                            selectedItemIds={selectedTerms}
                            title={title}
                        />
                        <Divider />
                    </Fragment>
                )
            )}
        </StandardDrawer>
    )
}

export default FilterDrawer
