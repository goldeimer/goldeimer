import { createMuiTheme } from '@material-ui/core/styles'

import { hexToRgbCss } from '@goldeimer/js-util'

const COLOR_PRIMARY_GOLDEIMER = {
    main: hexToRgbCss('#ffe300'),
    light: hexToRgbCss('#ffea64'),
    dark: hexToRgbCss('#fece00'),
    contrastText: hexToRgbCss('#000')
}

const COLOR_PRIMARY_VIVA_CON_AGUA = {
    main: hexToRgbCss('#008fc3'),
    light: hexToRgbCss('#11a2d6'),
    dark: hexToRgbCss('#005e8f'),
    contrastText: hexToRgbCss('#fff')
}

const TYPOGRAPHY_VENEER = {
    fontFamily: 'veneer'
}

const makeTheme = (
    colorPrimary = COLOR_PRIMARY_GOLDEIMER,
    fontStyleEmphasis = TYPOGRAPHY_VENEER
) => createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            drawer: 449,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        primary: colorPrimary,
        secondary: {
            main: '#000'
        },
        tonalOffset: 0.2
    },
    typography: {
        fontFamily: 'museo',
        h1: fontStyleEmphasis,
        h2: fontStyleEmphasis,
        h3: fontStyleEmphasis,
        h4: fontStyleEmphasis,
        h5: fontStyleEmphasis,
        h6: fontStyleEmphasis,
        button: {
            ...fontStyleEmphasis,
            fontSize: '1rem'
        }
    },
    overrides: {
        MuiListItemIcon: {
            root: {
                minWidth: 48,
                '&.tight': {
                    minWidth: 40
                },
                '&.tighter': {
                    minWidth: 36
                },
                '&.tightest': {
                    minWidth: 32
                }
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: 'rgba(127, 127, 127, 0.95)',
                fontWeight: 700
            }
        },
        MuiTypography: {
            h6: {
                '&.small': {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCssBaseline: {
            '@global': {
                '.simplebar-scrollbar::before': {
                    backgroundColor: colorPrimary.dark
                }
            }
        }
    }
})

const MuiThemeGoldeimer = makeTheme(COLOR_PRIMARY_GOLDEIMER)
const MuiThemeVivaConAgua = makeTheme(COLOR_PRIMARY_VIVA_CON_AGUA)

const MuiThemes = {
    Goldeimer: MuiThemeGoldeimer,
    VivaConAgua: MuiThemeVivaConAgua
}

const getThemeBySlug = (slug) => {
    switch (slug.replace(/\.|-|_/u, '').toLowerCase()) {
    case 'vca':
    case 'vivaconagua':
        return MuiThemeVivaConAgua

    case 'goldeimer':
    default:
        return MuiThemeGoldeimer
    }
}

const getThemeByUrlQuery = () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('theme')) {
        getThemeBySlug(urlParams.get('theme'))
    }

    return MuiThemeGoldeimer
}

export {
    MuiThemeGoldeimer as default,
    getThemeBySlug,
    getThemeByUrlQuery,
    MuiThemeGoldeimer,
    MuiThemeVivaConAgua,
    MuiThemes
}
