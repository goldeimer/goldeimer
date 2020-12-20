import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import CallIcon from '@material-ui/icons/Call'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import LaunchIcon from '@material-ui/icons/Launch'
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined'

import { concatenateAddress } from '@goldeimer/js-util'
import {
    CopyTextList,
    CopyTextListItem
} from '@goldeimer/react-components'

import { getSecondaryTaxonomy } from '../config/taxonomies'
import { ContextType } from '../enum'
import { PropTypeColor } from '../feature'
import { MarkerOutlinedIcon } from '../icon'

const useStyles = makeStyles(({ palette, spacing }) => ({
    avatar: ({ color }) => {
        const backgroundColor = color.main || palette.primary.main

        return {
            marginRight: spacing(1.5),
            color: palette.getContrastText(backgroundColor),
            backgroundColor
        }
    },
    chip: {
        marginRight: spacing(1)
    },
    disabledIcon: {
        // The material-ui implementation of this component adds 0.5 opacity
        // on the basis of a truthy `disabled` property.
        // Hence the somewhat counter-intuitive palette pick.
        color: palette.action.active
    },
    enabledIcon: {
        color: palette.success.main
    },
    link: {
        '&:hover .MuiTypography-root': {
            textDecoration: 'underline'
        }
    },
    textSecondary: {
        color: palette.text.secondary
    },
    thinLine: {
        lineHeight: 1.3
    }
}))

const secondaryTaxonomy = getSecondaryTaxonomy()

const ContextSection = ({
    context,
    placeName,
    type
}) => {
    const { palette } = useTheme()

    const {
        city,
        color = {
            main: palette.grey[600],
            dark: palette.grey[700],
            light: palette.grey[400]
        },
        iconComponent: IconComponent,
        phoneNumber,
        postCode,
        primaryTermName,
        secondaryTerms,
        street,
        url
    } = context

    const classes = useStyles({ color })

    const renderSubheading = () => {
        switch (type) {
        case ContextType.FEATURE:
            return (
                <>
                    <Typography
                        className={clsx(
                            classes.textSecondary,
                            classes.thinLine
                        )}
                        component="h4"
                        variant="subtitle2"
                    >
                        {primaryTermName}
                    </Typography>
                </>
            )

        default:
            return <></>
        }
    }

    const renderSecondaryTaxonomySection = () => (
        <>
            <Divider />
            <Box p={2}>
                <Box mb={1}>
                    <Typography
                        className={classes.textSecondary}
                        component="h3"
                        variant="body2"
                    >
                        {
                            // TODO:
                            // Differentiate between singular and plural names.
                        }
                        {secondaryTaxonomy.taxonomyName}
                    </Typography>
                </Box>
                {secondaryTaxonomy.terms.map((term) => ({
                    ...term,
                    isEnabledForContext: secondaryTerms
                        ? secondaryTerms.findIndex((secondaryTerm) => (
                            secondaryTerm.termId === term.termId
                        )) !== -1
                        : false
                })).sort((termA, termB) => {
                    if (
                        termA.isEnabledForContext
                        === termB.isEnabledForContext
                    ) {
                        return 0
                    }

                    if (termA.isEnabledForContext) {
                        return -1
                    }

                    return 1
                }).map(({
                    color: termColor,
                    isEnabledForContext,
                    termId,
                    termName
                }) => {
                    const highlightColor = isEnabledForContext
                        ? termColor.main || palette.primary.main
                        : 'rgba(0, 0, 0, 0.23)'

                    return (
                        <Chip
                            className={clsx(
                                classes.chip,
                                classes.textSecondary
                            )}
                            disabled={!isEnabledForContext}
                            icon={isEnabledForContext
                                ? <CheckIcon className={classes.enabledIcon} />
                                : (
                                    <ClearIcon
                                        className={classes.disabledIcon}
                                    />
                                )}
                            key={termId}
                            label={termName}
                            size="small"
                            style={{
                                borderColor: highlightColor,
                                borderWidth: '2px',
                                color: isEnabledForContext
                                    ? palette.text.primary
                                    : palette.text.secondary,
                                outlineColor: highlightColor
                            }}
                            variant="outlined"
                        />
                    )
                })}
            </Box>
        </>
    )

    const phoneCallLabel = 'Telefonnummer anrufen'
    const handlePhoneCall = () => {
        window.location.href = `tel:${phoneNumber}`
    }

    const websiteLabel = 'Webseite öffnen'
    const handleWebsiteOpen = () => { window.open(url, '_blank') }

    const copyInfoListItems = [{
        iconComponent: MarkerOutlinedIcon,
        label: 'Adresse kopieren',
        primaryText: concatenateAddress({ city, postCode, street })
    }, {
        iconComponent: CallIcon,
        label: phoneCallLabel,
        onClick: handlePhoneCall,
        primaryText: phoneNumber,
        secondaryActions: [{
            iconComponent: CallIcon,
            label: phoneCallLabel,
            onClick: handlePhoneCall
        }]
    }, {
        className: classes.link,
        iconComponent: PublicOutlinedIcon,
        label: websiteLabel,
        onClick: handleWebsiteOpen,
        primaryText: decodeURIComponent(url).replace(
            /^https?:\/\/(www\.)?/,
            ''
        ).replace(
            /\/$/,
            ''
        ),
        secondaryActions: [{
            iconComponent: LaunchIcon,
            label: websiteLabel,
            onClick: handleWebsiteOpen
        }],
        value: url
    }]

    return (
        <>
            <Box
                alignItems="center"
                display="flex"
                p={2}
            >
                {IconComponent && (
                    <Avatar
                        aria-label={primaryTermName}
                        className={classes.avatar}
                    >
                        <IconComponent />
                    </Avatar>
                )}
                <Box flexGrow={1}>
                    <Typography
                        component="h2"
                        variant="h6"
                    >
                        {placeName}
                    </Typography>
                    {renderSubheading()}
                </Box>
            </Box>
            {/* <Divider />
            <Box p={2}>
                {renderActionButtons()}
            </Box> */}
            {type === ContextType.FEATURE && renderSecondaryTaxonomySection()}
            <Divider />
            <Box py={2}>
                <CopyTextList>
                    {copyInfoListItems.map((itemProps) => (
                        <CopyTextListItem
                            key={itemProps.label}
                            {...itemProps}
                        />
                    ))}
                </CopyTextList>
            </Box>
        </>
    )
}

ContextSection.propTypes = {
    context: PropTypes.shape({
        city: PropTypes.string,
        color: PropTypeColor,
        iconComponent: PropTypes.elementType,
        phoneNumber: PropTypes.string,
        postCode: PropTypes.string,
        primaryTermName: PropTypes.string,
        secondaryTerms: PropTypes.arrayOf(
            PropTypes.shape({
                termId: PropTypes.string,
                termName: PropTypes.string
            })
        ),
        street: PropTypes.string,
        url: PropTypes.string
    }).isRequired,
    placeName: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
}

export default ContextSection
