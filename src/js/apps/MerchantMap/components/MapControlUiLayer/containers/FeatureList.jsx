import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { BRAND_NAME, MERCHANT_TYPE_NAME } from 'enum/taxonomies'
import selectFilteredAndSortedFeatureCollection
    from 'selectors/selectFilteredAndSortedFeatureCollection'

import LargeContentDialog
    from 'components/LargeContentDialog/LargeContentDialog'
import Table from 'components/Table/Table'

const makeArrayRender = (field, id2NameEnum) => (rowData) => (
    rowData[field].map(
        (value) => (
            value in id2NameEnum
                ? id2NameEnum[value]
                : value
        )
    ).join(', ')
)

const makeArrayFilterAndSearch = (field) => (terms, rowData) => (
    terms.filter((term) => (rowData[field].includes(term))).length > 0
)

const COLUMNS = [
    { field: 'name', title: 'Name' },
    { field: 'city', title: 'Stadt' },
    {
        field: 'merchantTypes',
        title: 'Kategorie',
        lookup: MERCHANT_TYPE_NAME,
        render: makeArrayRender('merchantTypes', MERCHANT_TYPE_NAME),
        customFilterAndSearch: makeArrayFilterAndSearch('merchantTypes')
    },
    {
        field: 'brands',
        title: 'Marke(n)',
        lookup: BRAND_NAME,
        render: makeArrayRender('brands', BRAND_NAME),
        customFilterAndSearch: makeArrayFilterAndSearch('brands')
    },
    { field: 'street', title: 'Straße' },
    { field: 'country', title: 'Land' },
    { field: 'url', title: '', filtering: false }
].map(
    (column) => ({
        ...column,
        cellStyle: { whiteSpace: 'nowrap' }
    })
)

const useStyles = makeStyles((theme) => ({
    elevationRemover: {
        '& .MuiPaper-root': {
            boxShadow: 'none'
        }
    }
}))

const FeatureList = (props) => {
    const { features } = useSelector(selectFilteredAndSortedFeatureCollection)

    const flattenedFeatures = features.map(({ geometry, properties }) => ({
        ...properties,
        geometry,
        city: properties.city.replace(/\s*\d{3,}\s*/g, '')
    }))

    const columns = COLUMNS.map((column) => {
        const dynamicParams = {}
        if (column.field === 'country') {
            dynamicParams.lookup = Object.fromEntries(
                ...[new Set(
                    flattenedFeatures.map(
                        ({ country }) => ([country, country])
                    )
                )]
            )
        }

        return Object.assign(
            column,
            dynamicParams
        )
    })

    const classes = useStyles()

    return (
        <LargeContentDialog {...props}>
            <div className={classes.elevationRemover}>
                <Table
                    columns={columns}
                    data={flattenedFeatures}
                    options={{
                        filtering: true,
                        grouping: false,
                        initialPage: 0,
                        padding: 'dense',
                        pageSize: 10,
                        pageSizeOptions: [5, 10, 20, 50],
                        paginationType: 'stepped',
                        sorting: true
                    }}
                    title="" // TODO: Move dialog title React element here?
                />
            </div>
        </LargeContentDialog>
    )
}

export default FeatureList
