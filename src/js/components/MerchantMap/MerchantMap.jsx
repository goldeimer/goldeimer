import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import muiTheme from 'js/muiTheme';


const MerchantMap = () =>
{
    return (
        <ThemeProvider theme={muiTheme}>
            <h1>Merchant Map</h1>
        </ThemeProvider>
    );
}


export default MerchantMap;
