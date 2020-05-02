import axios from 'axios';

import parseGoogleSheet from './util/parseGoogleSheet'


const ENDPOINT_URL_VCA = 'https://www.goldeimer.de/api/merchants';

const GOOGLE_SPREADSHEET_DOCUMENT_ID_GOLDEIMER =
    '1Uk34qKL3uI1DRjHcFAETIj9dXJ0QEiWZFtHHBHY_SRo';

const GOOGLE_SPREADSHEET_SHEET_GID_GOLDEIMER = '164271551';


const BRANDS = {
    Goldeimer: 'goldeimer',
    VivaConAgua: 'vca',
};

const MERCHANT_TYPE = {
    Retail: 'retail',
    Wholesale: 'wholesale',
};


const legacyGoldeimerDataToGeoJson = (data) =>
(
    {
        type: 'FeatureCollection',
        features: Array.prototype.map.call(
            data,
            (entry) => (
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            entry.Longitude,
                            entry.Latitude,
                        ],
                    },
                    properties: {
                        address: {
                            city: entry.Stadt,
                            country: 'Deutschland',
                            street: entry.Location,
                        },
                        brand: BRANDS.Goldeimer,
                        merchantType:
                            entry.l === 'Großmengen'
                            ? MERCHANT_TYPE.Wholesale
                            : MERCHANT_TYPE.Retail,
                        name: entry.Title,
                        url: entry.Description,
                    },
                }
            )
        ),
    }
);


const getMerchantDataGoldeimer = async () =>
{
    const result = await parseGoogleSheet(
        GOOGLE_SPREADSHEET_DOCUMENT_ID_GOLDEIMER,
        GOOGLE_SPREADSHEET_SHEET_GID_GOLDEIMER
    );

    return legacyGoldeimerDataToGeoJson(result);
};


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

        return null;
    }
};


const getMerchantData = async () =>
{
    const data = await getMerchantDataGoldeimer();
    const dataVca = await getMerchantDataVca();

    data.features = data.features.concat(dataVca.features);

    return data;
};


export default getMerchantData;
