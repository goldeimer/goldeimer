import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'

import { IconBadgeTooltip } from '@goldeimer/react-components'

import {
    useMainTaxonomies,
    useSecondaryTaxonomyStyles
} from '../../config'
import { FeatureIconBadgeTooltip } from '../../feature'

import PropTypePointCount from './PropTypePointCount'

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        padding: spacing(2),
        '&:last-child': {
            paddingBottom: spacing(2)
        }
    },
    row: {
        paddingBottom: spacing(2),
        '&:last-child': {
            // account for the badge overlap
            paddingBottom: 8
        }
    },
    rowItem: {
        marginRight: spacing(3),
        '&:last-child': {
            // account for the badge overlap
            marginRight: 10
        }
    },
    verticalDivider: {
        marginLeft: spacing(1),
        marginRight: spacing(1),
        marginTop: 5
    }
}), { name: 'ClusterMarkerDetailCard' })

const ClusterMarkerDetailCard = ({
    pointCount,
    shouldHideOnEmpty
}) => {
    const classes = useStyles()
    const taxonomyClasses = useSecondaryTaxonomyStyles()

    const {
        primary: { terms: primaryTerms },
        secondary: { terms: secondaryTerms }
    } = useMainTaxonomies()

    return (
        <Card elevation={3}>
            <CardContent className={classes.root}>
                {secondaryTerms.filter(({ termId }) => (
                    !shouldHideOnEmpty
                    || pointCount.secondary[termId].total > 0
                )).map(({
                    iconComponent: SecondaryIconComponent,
                    termId: secondaryTermId,
                    termName: secondaryTermName
                }, secondaryIndex) => (
                    <Fragment key={`secondary:${secondaryTermId}`}>
                        <Box
                            className={classes.row}
                            display="flex"
                            alignItems="center"
                        >
                            <Box className={classes.rowItem}>
                                <IconBadgeTooltip
                                    badgeContent={pointCount.secondary[
                                        secondaryTermId
                                    ].total}
                                    badgeProps={{
                                        classes: {
                                            badge: taxonomyClasses[
                                                `${secondaryTermId}-background-dark`
                                            ]
                                        }
                                    }}
                                    iconComponent={SecondaryIconComponent}
                                    tooltipPlacement={secondaryIndex === 0
                                        ? 'left-end'
                                        : 'left-start'}
                                    tooltipTitle={secondaryTermName}
                                />
                            </Box>
                            <Divider
                                className={classes.verticalDivider}
                                flexItem
                                orientation="vertical"
                                variant="middle"
                            />
                            {primaryTerms.map(({
                                iconComponent: PrimaryIconComponent,
                                termId: primaryTermId,
                                termName: primaryTermName
                            }) => {
                                const primaryTermPointCount = (
                                    pointCount.secondary[
                                        secondaryTermId
                                    ].primary[
                                        primaryTermId
                                    ]
                                )

                                if (
                                    !primaryTermPointCount
                                    && shouldHideOnEmpty
                                ) {
                                    return null
                                }

                                return (
                                    <Box
                                        className={classes.rowItem}
                                        key={`secondary:${secondaryTermId}:primary:${primaryTermId}`}
                                    >
                                        <FeatureIconBadgeTooltip
                                            badgeProps={{
                                                classes: {
                                                    badge: taxonomyClasses[
                                                        `${secondaryTermId}-background`
                                                    ]
                                                }
                                            }}
                                            badgeContent={primaryTermPointCount}
                                            iconComponent={PrimaryIconComponent}
                                            tooltipPlacement={
                                                secondaryIndex === 0
                                                    ? 'top-start'
                                                    : 'bottom-start'
                                            }
                                            tooltipTitle={primaryTermName}
                                        />
                                    </Box>
                                )
                            })}
                        </Box>
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    )
}

ClusterMarkerDetailCard.propTypes = {
    pointCount: PropTypePointCount.isRequired,
    shouldHideOnEmpty: PropTypes.bool
}

ClusterMarkerDetailCard.defaultProps = {
    shouldHideOnEmpty: true
}

export default memo(ClusterMarkerDetailCard)
