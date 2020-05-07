import { createMuiTheme } from '@material-ui/core/styles'

const colorPrimary = '#ffe300'

const typographyFontFamilyVeneer = {
    fontFamily: 'veneer'
}

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: colorPrimary
        },
        secondary: {
            // placeholder color, TBD w/ @Manou
            main: '#795548'
        }
    },
    // TBD w/ @Manou:
    //
    //     shape: {
    //         borderRadius: 0,
    //     },
    typography: {
        fontFamily: 'museo',
        h1: typographyFontFamilyVeneer,
        h2: typographyFontFamilyVeneer,
        h3: typographyFontFamilyVeneer,
        h4: typographyFontFamilyVeneer,
        h5: typographyFontFamilyVeneer,
        h6: typographyFontFamilyVeneer,
        button: Object.assign(
            {
                fontSize: '1rem'
            },
            typographyFontFamilyVeneer
        )
    }
})

export {
    muiTheme as default,
    colorPrimary
}
