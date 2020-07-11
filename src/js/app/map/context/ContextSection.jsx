import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

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

import { makeStyles, useTheme } from '@material-ui/core/styles'

import CopyTextList from '@lib/components/clipboard/CopyTextList'
import CopyTextListItem from '@lib/components/clipboard/CopyTextListItem'
import CopyTextListItemSecondaryAction
    from '@lib/components/clipboard/CopyTextListItemSecondaryAction'

import { CONTEXT_TYPE } from '@map/context'
import { MarkerOutlinedIcon } from '@map/icons/ui'
import { getSecondaryTaxonomy } from '@map/taxonomies'

const useStyles = makeStyles(({ palette, spacing }) => ({
    avatar: ({ color }) => {
        const backgroundColor = color || palette.primary.main

        return {
            marginRight: spacing(1),
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
    headerSpacer: ({ color }) => ({
        // height of `AutoCompleteSearchBox` + margins
        minHeight: spacing(8),
        backgroundColor: color || palette.primary.light
    }),
    link: {
        '&:hover .MuiTypography-root': {
            textDecoration: 'underline'
        }
    },
    listItemText: {
        marginRight: spacing(7),
        '& .MuiTypography-root': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    },
    secondaryAction2: {
        //   2 by default (i.e. value for the first button)
        // + 1 for "margin"
        // + 3 to shift by an icon's with
        right: spacing(6)
    },
    textarea: {
        position: 'fixed',
        top: 0,
        left: 0,
        visibility: 'hidden'
    },
    textSecondary: {
        color: palette.text.secondary
    }
}))

const secondaryTaxonomy = getSecondaryTaxonomy()

const ContextSection = ({
    context,
    placeName,
    type
}) => {
    const {
        city,
        color,
        iconComponent: IconComponent,
        phoneNumber,
        postCode,
        primaryTaxonomyTermName,
        secondaryTaxonomyTerms,
        street,
        url
    } = context

    const classes = useStyles({ color })
    const { palette } = useTheme()

    const renderSubheading = () => {
        switch (type) {
        case CONTEXT_TYPE.feature.value:
            return (
                <>
                    <Typography
                        className={classes.textSecondary}
                        component='h4'
                        variant='subtitle2'
                    >
                        {primaryTaxonomyTermName}
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
                        component='h3'
                        variant='body2'
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
                    isEnabledForContext: secondaryTaxonomyTerms
                        ? secondaryTaxonomyTerms.findIndex((secondaryTerm) => (
                            secondaryTerm.termId === term.termId
                        )) !== -1
                        : false
                })).sort((termA, termB) => {
                    if (
                        termA.isEnabledForContext ===
                        termB.isEnabledForContext
                    ) {
                        return 0
                    }

                    if (termA.isEnabledForContext) {
                        return -1
                    }

                    return 1
                }).map(({
                    color: contextColor,
                    isEnabledForContext,
                    termId,
                    termName
                }) => {
                    const highlightColor = isEnabledForContext
                        ? contextColor || palette.primary.main
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
                            size='small'
                            style={{
                                borderColor: highlightColor,
                                borderWidth: '2px',
                                color: isEnabledForContext
                                    ? palette.text.primary
                                    : palette.text.secondary,
                                outlineColor: highlightColor
                            }}
                            variant='outlined'
                        />
                    )
                })}
            </Box>
        </>
    )

    const address = {
        icon: <MarkerOutlinedIcon color='primary' />,
        label: 'Adresse kopieren',
        value: [street, `${postCode} ${city}`.trim()].filter(
            (part) => Boolean(part)
        ).join(', ')
    }

    const phoneCallLabel = 'Telefonnummer anrufen'
    const handlePhoneCall = () => {
        window.location.href = `tel:${phoneNumber}`
    }
    const phone = {
        handleClick: handlePhoneCall,
        icon: <CallIcon color='primary' />,
        label: phoneCallLabel,
        renderSecondaryActions: () => (
            <CopyTextListItemSecondaryAction
                className={classes.secondaryAction2}
                iconComponent={CallIcon}
                label={phoneCallLabel}
                onClick={handlePhoneCall}
            />
        ),
        value: phoneNumber
    }

    const websiteLabel = 'Webseite öffnen'
    const handleWebsiteOpen = () => { window.open(url, '_blank') }
    const website = {
        className: classes.link,
        handleClick: handleWebsiteOpen,
        icon: <PublicOutlinedIcon color='primary' />,
        label: websiteLabel,
        renderSecondaryActions: () => (
            <CopyTextListItemSecondaryAction
                className={classes.secondaryAction2}
                iconComponent={LaunchIcon}
                label={websiteLabel}
                onClick={handleWebsiteOpen}
            />
        ),
        text: decodeURIComponent(url).replace(
            /^https?:\/\/(www\.)?/,
            ''
        ).replace(
            /\/$/,
            ''
        ),
        value: url
    }

    const renderCopyTextListItems = (handleCopy) => (
        <>
            {[
                // order is deliberate, as shown to the user
                address,
                website,
                phone
            ].filter((item) => Boolean(item.value)).map(({
                className = '',
                handleClick = null,
                icon,
                label,
                renderSecondaryActions = null,
                text,
                value
            }) => (
                <CopyTextListItem
                    className={className}
                    handleClick={handleClick}
                    handleCopy={handleCopy}
                    icon={icon}
                    key={value}
                    label={label}
                    renderSecondaryActions={renderSecondaryActions}
                    text={text || value}
                    textClassName={classes.listItemText}
                    value={value}
                />
            ))}
        </>
    )

    return (
        <>
            <div className={classes.headerSpacer} />
            <Divider />
            <Box
                alignItems='center'
                display='flex'
                p={2}
            >
                {IconComponent && (
                    <Avatar
                        aria-label={primaryTaxonomyTermName}
                        className={classes.avatar}
                    >
                        <IconComponent />
                    </Avatar>
                )}
                <Box flexGrow={1}>
                    <Typography
                        component='h2'
                        variant='h6'
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
            {CONTEXT_TYPE.feature.is(type) && renderSecondaryTaxonomySection()}
            <Divider />
            <Box py={2}>
                <CopyTextList
                    renderItems={renderCopyTextListItems}
                />
            </Box>
        </>
    )
}

ContextSection.propTypes = {
    context: PropTypes.shape({
        city: PropTypes.string,
        color: PropTypes.string,
        iconComponent: PropTypes.elementType,
        phoneNumber: PropTypes.string,
        postCode: PropTypes.string,
        primaryTaxonomyTermName: PropTypes.string,
        secondaryTaxonomyTerms: PropTypes.arrayOf(
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
