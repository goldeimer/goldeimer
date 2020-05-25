import { createMuiTheme } from '@material-ui/core/styles'

import 'img/favicon/goldeimer.favicon.png'
import 'img/favicon/vca.favicon.png'

const COLOR_PRIMARY_GOLDEIMER = '#ffe300'
const COLOR_PRIMARY_VIVA_CON_AGUA = '#008fc3' // pool2: '#0a6b91'

const TYPOGRAPHY_VENEER = {
    fontFamily: 'veneer'
}

const makeMuiTheme = (
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
        button: Object.assign(
            {
                fontSize: '1rem'
            },
            headingFontStyle
        )
    }
})

const THEMES = {
    Goldeimer: {
        favicon: 'goldeimer.favicon.png',
        mui: makeMuiTheme(COLOR_PRIMARY_GOLDEIMER, '#000')
    },
    VivaConAgua: {
        favicon: 'vca.favicon.png',
        mui: makeMuiTheme(COLOR_PRIMARY_VIVA_CON_AGUA, '#fff')
    }
}

const getTheme = () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('theme') && urlParams.get('theme') === 'vivaconagua') {
        return THEMES.VivaConAgua
    }

    return THEMES.Goldeimer
}

const defaultMuiTheme = THEMES.Goldeimer.mui

export {
    getTheme as default,
    defaultMuiTheme as muiTheme,
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA
}
