import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import muiTheme from 'js/muiTheme';

import getMerchantData from './getMerchantData';


const MerchantMap = () =>
{
    const [merchantData, setMerchantData] = useState(null);

    useEffect(
        () => {
            const fetchData = async () => {
                const data = await getMerchantData();
                setMerchantData(data);
            };

            fetchData();
        },
        []
    );

    return (
        <ThemeProvider theme={muiTheme}>
            <h1>Merchant Map</h1>
            <code>{JSON.stringify(merchantData)}</code>
        </ThemeProvider>
    );
}


export default MerchantMap;
