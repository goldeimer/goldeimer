import { createMuiTheme } from '@material-ui/core/styles'

import 'img/favicon/goldeimer.favicon.png'
import 'img/favicon/vca.favicon.png'

import GoldeimerIcon from '@lib/components/icons/brands/GoldeimerIcon'
import VivaConAguaIcon from '@lib/components/icons/brands/VivaConAguaIcon'

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
            main: '#000'
        },
        layerHighlight: {
            main: colorLayerHighlight
        }
    },
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
        id: 'goldeimer',
        favicon: 'img/favicon/goldeimer.favicon.png',
        logoIconComponent: GoldeimerIcon,
        mui: makeTheme(COLOR_PRIMARY_GOLDEIMER, '#000')
    },
    VivaConAgua: {
        id: 'vica-con-agua',
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

const defaultTheme = THEME.Goldeimer

export {
    defaultTheme as default,
    getTheme,
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA,
    THEME
}
