import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import muiTheme from 'js/muiTheme';

import {
    getMerchantDataGoldeimer,
    getMerchantDataVca,
} from './getMerchantData';


const MerchantMap = () =>
{
    const [merchantDataGoldeimer, setMerchantDataGoldeimer] = useState(null);
    const [merchantDataVca, setMerchantDataVca] = useState(null);

    useEffect(
        () => {
            const fetchDataGoldeimer = async () => {
                const data = await getMerchantDataGoldeimer();
                setMerchantDataGoldeimer(data);
            };

            const fetchDataVca = async () => {
                const data = await getMerchantDataVca();
                setMerchantDataVca(data);
            };

            fetchDataGoldeimer();
            fetchDataVca();
        },
        []
    );

    return (
        <ThemeProvider theme={muiTheme}>
            <h1>Merchant Map</h1>
            <code>
                {
                    merchantDataGoldeimer
                    ? JSON.stringify(merchantDataGoldeimer[0])
                    : ''
                }
            </code>
            <br />
            <br />
            <br />
            <code>
                {
                    merchantDataVca
                    ? JSON.stringify(merchantDataVca[0])
                    : ''
                }
            </code>
        </ThemeProvider>
    );
}


export default MerchantMap;
