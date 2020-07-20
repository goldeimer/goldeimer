import React, { cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'

import { makeStyles } from '@material-ui/core/styles'

import useClipboard from '@lib/hooks/useClipboard'

import StandardList from '@lib/components/StandardList'

const useStyles = makeStyles(() => ({
    textarea: {
        position: 'fixed',
        top: 0,
        left: 0,
        visibility: 'hidden'
    }
}))

const CopyTextList = ({ children }) => {
    const classes = useStyles()

    const { copyText, textareaRef } = useClipboard()
    const { enqueueSnackbar } = useSnackbar()

    const handleCopy = async (_, text) => {
        try {
            await copyText(text)
            enqueueSnackbar('Kopiert!')
        } catch (__) {
            enqueueSnackbar(
                'Fehler beim Kopieren...',
                { variant: 'error' }
            )
        }
    }

    return (
        <>
            <textarea className={classes.textarea} ref={textareaRef} />
            <StandardList>
                {Children.map(children, (child) => (
                    cloneElement(child, { onCopy: handleCopy })
                ))}
            </StandardList>
        </>
    )
}

CopyTextList.propTypes = {
    children: PropTypes.node
}

CopyTextList.defaultProps = {
    children: null
}

export default CopyTextList
