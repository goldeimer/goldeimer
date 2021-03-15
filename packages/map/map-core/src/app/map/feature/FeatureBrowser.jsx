import React from 'react'
// import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
// import LinkIcon from '@material-ui/icons/Link'
// import MarkerIcon from '@material-ui/icons/Room'

import {
    LargeContentDialog,
    Table
} from '@goldeimer/react-components'

// import { BrandName, MerchantTypeName } from '@map/config/taxonomies'
import { FeatureFormat } from '../enum'
import { useSourceFeatures } from '.'

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
    const features = useSourceFeatures(FeatureFormat.detail)

    // const dispatch = useDispatch()

    const classes = useStyles()

    // let columns = makeColumns(classes, dispatch)

    return (
        <LargeContentDialog {...props}>
            <div />
        </LargeContentDialog>
    )
}

export default FeatureBrowser
