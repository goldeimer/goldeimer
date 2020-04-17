import { createMuiTheme } from '@material-ui/core/styles';


const headingBaseTypography = {
    fontFamily: 'veneer !important',
};

const muiTheme = createMuiTheme({
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


export default muiTheme;
