import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const ThemeRoot = ({
    children, favicon, theme, title
}) => (
    <ThemeProvider theme={theme}>
        <Helmet
            defaultTitle={title}
            titleTemplate={`${title} - %s`}
        >
            <meta name="description" content={title} />
            {favicon && <link rel="icon" href={`/static/${favicon}`} />}
        </Helmet>
        <CssBaseline />
        {children}
    </ThemeProvider>
)

ThemeRoot.propTypes = {
    children: PropTypes.node.isRequired,
    favicon: PropTypes.string,
    theme: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
    title: PropTypes.string
}

ThemeRoot.defaultProps = {
    favicon: null,
    title: 'App'
}

export default ThemeRoot
