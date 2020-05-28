import { createMuiTheme } from '@material-ui/core/styles'

import 'img/favicon/goldeimer.favicon.png'
import 'img/favicon/vca.favicon.png'

import GoldeimerIcon from 'components/icons/brands/GoldeimerIcon'
import VivaConAguaIcon from 'components/icons/brands/VivaConAguaIcon'

const COLOR_PRIMARY_GOLDEIMER = '#ffe300'
const COLOR_PRIMARY_VIVA_CON_AGUA = '#008fc3'

const TYPOGRAPHY_VENEER = {
    fontFamily: 'veneer'
}

const makeTheme = (
    colorPrimary = COLOR_PRIMARY_GOLDEIMER,
    colorLayerHighlight = '#000',
    headingFontStyle = TYPOGRAPHY_VENEER
) => createMuiTheme({
    palette: {
        primary: {
            main: colorPrimary
        },
        secondary: {
            // placeholder color, TBD w/ @Manou
            main: '#000'
        },
        layerHighlight: {
            main: colorLayerHighlight
        }
    },
    // TBD w/ @Manou:
    //
    //     shape: {
    //         borderRadius: 0,
    //     },
    typography: {
        fontFamily: 'museo',
        h1: headingFontStyle,
        h2: headingFontStyle,
        h3: headingFontStyle,
        h4: headingFontStyle,
        h5: headingFontStyle,
        h6: headingFontStyle,
        button: {
            ...headingFontStyle,
            fontSize: '1rem'
        }
    }
})

const THEME = {
    Goldeimer: {
        favicon: 'img/favicon/goldeimer.favicon.png',
        logoIconComponent: GoldeimerIcon,
        mui: makeTheme(COLOR_PRIMARY_GOLDEIMER, '#000')
    },
    VivaConAgua: {
        favicon: 'img/favicon/vca.favicon.png',
        logoIconComponent: VivaConAguaIcon,
        mui: makeTheme(COLOR_PRIMARY_VIVA_CON_AGUA, '#fff')
    }
}

const getTheme = () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('theme') && urlParams.get('theme') === 'vivaconagua') {
        return THEME.VivaConAgua
    }

    return THEME.Goldeimer
}

const defaultMuiTheme = THEME.Goldeimer.mui

export {
    defaultMuiTheme as default,
    getTheme,
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA,
    THEME
}
