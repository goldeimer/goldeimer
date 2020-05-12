import { createMuiTheme } from '@material-ui/core/styles'

const COLOR_PRIMARY_GOLDEIMER = '#ffe300'
const COLOR_PRIMARY_VIVA_CON_AGUA = '#0a6b91'

const TYPOGRAPHY_VENEER = {
    fontFamily: 'veneer'
}

const makeMuiTheme = (
    colorPrimary = COLOR_PRIMARY_GOLDEIMER,
    colorLayerHighlight = '#000',
    headingFontStyle = TYPOGRAPHY_VENEER
) => createMuiTheme({
    breakpoints: {
        values: {
            // mui defaults
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            // custom
            featureListFold1: 1400,
            featureListFold2: 600
        }
    },
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

const GoldeimerMuiTheme = makeMuiTheme(COLOR_PRIMARY_GOLDEIMER, '#000')
const VivaConAguaMuiTheme = makeMuiTheme(COLOR_PRIMARY_VIVA_CON_AGUA, '#fff')

const getMuiTheme = () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('theme') && urlParams.get('theme') === 'vivaconagua') {
        return VivaConAguaMuiTheme
    }

    return GoldeimerMuiTheme
}

export {
    GoldeimerMuiTheme as default,
    VivaConAguaMuiTheme,
    getMuiTheme
}
