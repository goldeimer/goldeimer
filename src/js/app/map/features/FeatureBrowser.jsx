import React from 'react'
import clsx from 'clsx'
// import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
// import LinkIcon from '@material-ui/icons/Link'
// import MarkerIcon from '@material-ui/icons/Room'

// import { BRAND_NAME, MERCHANT_TYPE_NAME } from '@map/taxonomies'
// import { useSourceFeatures, FEATURE_FORMAT } from '@map/features'

// import ExternalLink from '@lib/components/ExternalLink'
import LargeContentDialog from '@lib/components/modals/LargeContentDialog'
// import Table from '@lib/components/Table'

// const makeArrayRender = (field, id2NameEnum) => (rowData) => (
//     rowData[field].map(
//         (value) => (
//             value in id2NameEnum
//                 ? id2NameEnum[value]
//                 : value
//         )
//     ).join(', ')
// )

// const makeArrayFilterAndSearch = (field) => (terms, rowData) => (
//     terms.filter((term) => (rowData[field].includes(term))).length > 0
// )

// const makeColumns = (classes, dispatch) => ([
//     { field: 'placeName', title: 'Name' },
//     { field: 'city', title: 'Stadt' },
//     {
//         field: 'icons',
//         title: null,
//         filtering: false,
//         render: (rowData) => {
//             const { coordinates } = rowData.geometry

//             const marker = coordinates.length === 2
//                 ? (
//                     <IconButton
//                         aria-label='Auf Karte zeigen'
//                         className={classes.iconButton}
//                         onClick={() => dispatch(
//                             APP.map.features.selected.set({
//                                 id: rowData.id,
//                                 latitude: parseFloat(coordinates[1]),
//                                 longitude: parseFloat(coordinates[0]),
//                                 placeName: rowData.placeName
//                             })
//                         )}
//                         size='small'
//                     >
//                         <MarkerIcon size='small' />
//                     </IconButton>
//                 )
//                 : null

//             const website = rowData.url.length > 0
//                 ? (
//                     <ExternalLink
//                         href={rowData.url}
//                         variant='inherit'
//                     >
//                         <IconButton
//                             aria-label='Zur Webseite'
//                             className={classes.iconButton}
//                             size='small'
//                         />
//                     </ExternalLink>
//                 )
//                 : null

//             return (
//                 <>
//                     {marker}
//                     {website}
//                 </>
//             )
//         }
//     },
//     {
//         field: 'merchantTypes',
//         title: 'Kategorie',
//         lookup: MERCHANT_TYPE_NAME,
//         render: makeArrayRender('merchantTypes', MERCHANT_TYPE_NAME),
//         customFilterAndSearch: makeArrayFilterAndSearch('merchantTypes')
//     },
//     {
//         field: 'brands',
//         title: 'Marke(n)',
//         lookup: BRAND_NAME,
//         render: makeArrayRender('brands', BRAND_NAME),
//         customFilterAndSearch: makeArrayFilterAndSearch('brands')
//     },
//     { field: 'street', title: 'Straße' },
//     { field: 'country', title: 'Land' }
// ]).map(
//     (column) => {
//         const whitespaceNoWrap = { whiteSpace: 'nowrap' }

//         return {
//             ...column,
//             cellStyle: (
//                 'cellStyle' in column
//                     ? Object.assign(column.cellStyle, whitespaceNoWrap)
//                     : whitespaceNoWrap
//             )
//         }
//     }
// )

const useStyles = makeStyles((theme) => ({
    customPaddedTableCells: {
        '& .MuiTableCell-root': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            '&:first-child': {
                paddingLeft: theme.spacing(3)
            }
        }
    },
    elevationRemover: {
        '& .MuiPaper-root': {
            boxShadow: 'none'
        }
    },
    iconButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}))

const FeatureBrowser = (props) => {
    // const features = useSourceFeatures(FEATURE_FORMAT.geojson)

    // const dispatch = useDispatch()

    const classes = useStyles()

    // let flattenedFeatures = []
    // let columns = makeColumns(classes, dispatch)

    // if (features) {
    //     flattenedFeatures = features.map(
    //         ({ geometry, id, properties }) => ({
    //             ...properties,
    //             geometry,
    //             id,
    //             city: properties.city.replace(/\s*\d{3,}\s*/g, '')
    //         })
    //     )

    //     columns = columns.map((column) => {
    //         const dynamicParams = {}
    //         if (column.field === 'country') {
    //             dynamicParams.lookup = Object.fromEntries(
    //                 ...[new Set(
    //                     flattenedFeatures.map(
    //                         ({ country }) => ([country, country])
    //                     )
    //                 )]
    //             )
    //         }

    //         return {
    //             ...column,
    //             ...dynamicParams
    //         }
    //     })
    // }

    return (
        <LargeContentDialog {...props}>
            <div
                className={clsx(
                    classes.customPaddedTableCells,
                    classes.elevationRemover
                )}
            >
                <p>Diese Komponente kommt heute Nacht oder morgen wieder...</p>
            </div>
        </LargeContentDialog>
    )
}

export default FeatureBrowser
