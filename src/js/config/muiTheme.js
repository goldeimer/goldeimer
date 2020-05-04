import { createMuiTheme } from '@material-ui/core/styles';


const colorPrimary = '#ffe300';

const headingBaseTypography = {
    fontFamily: 'veneer !important',
};

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: colorPrimary,
        },
        secondary: {
            // placeholder color, TBD w/ @Manou
            main: '#795548',
        },
    },
// TBD w/ @Manou:
//
//     shape: {
//         borderRadius: 0,
//     },
    typography: {
        fontFamily: 'museo',
        h1: headingBaseTypography,
        h2: headingBaseTypography,
        h3: headingBaseTypography,
        h4: headingBaseTypography,
        h5: headingBaseTypography,
        h6: headingBaseTypography,
    },
});


export {
    muiTheme as default,
    colorPrimary,
};
