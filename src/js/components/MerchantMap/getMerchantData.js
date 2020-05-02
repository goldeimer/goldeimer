import axios from 'axios';

import parseGoogleSheet from './util/parseGoogleSheet'


const ENDPOINT_URL_VCA = 'https://www.goldeimer.de/api/merchants';

const GOOGLE_SPREADSHEET_DOCUMENT_ID_GOLDEIMER =
    '1Uk34qKL3uI1DRjHcFAETIj9dXJ0QEiWZFtHHBHY_SRo';

const GOOGLE_SPREADSHEET_SHEET_GID_GOLDEIMER = '164271551';


const getMerchantDataGoldeimer = async () =>
{
    const result = await parseGoogleSheet(
        GOOGLE_SPREADSHEET_DOCUMENT_ID_GOLDEIMER,
        GOOGLE_SPREADSHEET_SHEET_GID_GOLDEIMER
    );

    return result;
}


const getMerchantDataVca = async () =>
{
    try
    {
        const response = await axios.get(ENDPOINT_URL_VCA);

        return response.data;
    }
    catch (error)
    {
        console.log(error);

        return [];
    }
}


export {
    getMerchantDataGoldeimer,
    getMerchantDataVca,
};
