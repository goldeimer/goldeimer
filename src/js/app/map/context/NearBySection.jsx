import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import NearMeIcon from '@material-ui/icons/NearMe'

import { CONTEXT_TYPE } from '@map/context'

const useStyles = makeStyles(({ palette, spacing }) => ({
    nearMeIcon: {
        color: palette.text.secondary
    },
    nearMeIconWrap: {
        display: 'flex',
        fontSize: spacing(3.5),
        lineHeight: 1,
        marginRight: spacing(1)
    }
}))

const getNearBySectionTitleByContextType = (contextType) => {
    switch (contextType) {
    case CONTEXT_TYPE.feature.value:
        return 'Im Umkreis'

    case CONTEXT_TYPE.currentLocation.value:
        return 'Im Umkreis deines Standorts'

    case CONTEXT_TYPE.geocodingResult.value:
        return 'Im Umkreis deines Suchergebnisses'

    default:
        return 'Im Umkreis'
    }
}

const NearBySection = ({
    contextType,
    latitude,
    longitude
}) => {
    const classes = useStyles()

    return (
        <Box
            alignItems='center'
            display='flex'
            p={2}
        >
            <span className={classes.nearMeIconWrap}>
                <NearMeIcon
                    className={classes.nearMeIcon}
                    fontSize='inherit'
                />
            </span>
            <Typography
                className='small'
                component='h2'
                variant='h6'
            >
                {getNearBySectionTitleByContextType(contextType)}
            </Typography>
        </Box>
    )
}

NearBySection.propTypes = {
    contextType: PropTypes.oneOfType([
        PropTypes.number, // Enum.value
        PropTypes.shape({
            get: PropTypes.func,
            has: PropTypes.func,
            is: PropTypes.func,
            toString: PropTypes.func,
            valueOf: PropTypes.func
        })
    ]).isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}

export default NearBySection
