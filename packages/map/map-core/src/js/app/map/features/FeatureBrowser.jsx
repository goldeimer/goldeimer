import React from 'react'
import clsx from 'clsx'
// import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
// import LinkIcon from '@material-ui/icons/Link'
// import MarkerIcon from '@material-ui/icons/Room'

import {
    FEATURE_FORMAT
} from '@map/enum'

// import { BRAND_NAME, MERCHANT_TYPE_NAME } from '@map/config/taxonomies'
import { useSourceFeatures } from '@map/features'

import LargeContentDialog from '@lib/components/modals/LargeContentDialog'
import Table from '@lib/components/Table'

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
    const features = useSourceFeatures(FEATURE_FORMAT.detail)

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
