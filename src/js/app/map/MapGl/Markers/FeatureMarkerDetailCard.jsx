import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ palette, spacing }) => ({
    avatar: ({ color }) => {
        const backgroundColor = color !== null
            ? color
            : palette.primary.main

        return {
            marginRight: spacing(1),
            color: palette.getContrastText(backgroundColor),
            backgroundColor
        }
    },
    content: {
        padding: spacing(2),
        '&:last-child': {
            paddingBottom: spacing(2)
        }
    },
    secondaryIconComponentWrap: {
        marginRight: spacing(1)
    },
    title: {
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    textSecondary: {
        color: palette.text.secondary
    },
    textTertiary: {
        color: palette.text.disabled
    }
}))

const FeatureMarkerDetailCard = ({
    city,
    color,
    country,
    iconComponent: IconComponent,
    placeName,
    primaryTaxonomyTermName,
    postCode,
    secondaryTaxonomyTerms,
    street
}) => {
    const classes = useStyles({ color })

    return (
        <Card>
            <CardHeader
                avatar={(
                    <Avatar
                        aria-label={primaryTaxonomyTermName}
                        className={classes.avatar}
                    >
                        <IconComponent />
                    </Avatar>
                )}
                classes={{ title: classes.title }}
                subheader={primaryTaxonomyTermName}
                title={placeName}
            />
            <Divider />
            <CardContent className={classes.content}>
                <Typography
                    component='p'
                    variant='body2'
                >
                    {street}
                    <br />
                    <span className={classes.textSecondary}>
                        {`${postCode} ${city}`.trim()}
                    </span>
                    <br />
                    <span className={classes.textSecondary}>
                        {country}
                    </span>
                </Typography>
                <Box display='flex' mt={1}>
                    {secondaryTaxonomyTerms.map(
                        ({
                            color: secondaryColor,
                            iconComponent: SecondaryIconComponent,
                            termName
                        }) => {
                            if (!termName) {
                                return (
                                    <span
                                        className={
                                            classes.secondaryIconComponentWrap
                                        }
                                    >
                                        <SecondaryIconComponent
                                            color={secondaryColor}
                                            key={secondaryColor}
                                        />
                                    </span>
                                )
                            }

                            return (
                                <Tooltip
                                    aria-label={termName}
                                    key={`${termName}:${secondaryColor}`}
                                    title={termName}
                                >
                                    <span
                                        className={
                                            classes.secondaryIconComponentWrap
                                        }
                                    >
                                        <SecondaryIconComponent
                                            color={secondaryColor}
                                        />
                                    </span>
                                </Tooltip>
                            )
                        }
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}

FeatureMarkerDetailCard.propTypes = {
    city: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    iconComponent: PropTypes.elementType.isRequired,
    placeName: PropTypes.string.isRequired,
    primaryTaxonomyTermName: PropTypes.string.isRequired,
    postCode: PropTypes.string,
    secondaryTaxonomyTerms: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string,
            iconComponent: PropTypes.elementType,
            termName: PropTypes.string
        })
    ),
    street: PropTypes.string.isRequired
}

FeatureMarkerDetailCard.defaultProps = {
    postCode: '',
    secondaryTaxonomyTerms: []
}

export default memo(FeatureMarkerDetailCard)
