import axios from 'axios'

import { BRAND, MERCHANT_TYPE } from 'reducers/MerchantMap/taxonomies'
import parseGoogleSheet from 'util/parseGoogleSheet'

const ENDPOINT_URL_VCA = 'https://www.goldeimer.de/api/merchants'

const GOOGLE_SPREADSHEET_URL =
'https://docs.google.com/spreadsheets/d/e/2PACX-1vRuJMztp6DfBGPv5X1ZvRhNUL95-GTXoxADEhh3XiWzmZYyaWrytx3E4-_8eb7AkW_nFuuj9Nn5fJoh/pub?gid=164271551&single=true&output=csv'

const convertMerchantType = (legacyValue) => {
    switch (legacyValue) {
    case 'Getränkefachgroßhandel':
    case 'Großmengen':
        return MERCHANT_TYPE.wholesale

    case 'Online-Shops':
        return MERCHANT_TYPE.online

    case 'Lieferservice':
        return MERCHANT_TYPE.delivery

        // Einzelhandel
        // Einzelhandel (Kiste)
    default:
        return MERCHANT_TYPE.retail
    }
}

const legacyGoldeimerDataToGeoJson = (data) => ({
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
                        entry.Latitude
                    ]
                },
                properties: {
                    address: {
                        city: entry.Stadt,
                        country: 'Deutschland',
                        street: entry.Location
                    },
                    brands: [BRAND.goldeimer],
                    merchantTypes: [convertMerchantType(entry.l)],
                    name: entry.Title,
                    url: entry.Description
                }
            }
        )
    )
})

const getGeoJsonFeatureCollectionGoldeimer = async () => {
    const result = await parseGoogleSheet(GOOGLE_SPREADSHEET_URL)

    return legacyGoldeimerDataToGeoJson(result)
}

const getGeoJsonFeatureCollectionVca = async () => {
    try {
        const response = await axios.get(ENDPOINT_URL_VCA)

        return response.data
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log(error)

        return null
    }
}

const getGeoJsonFeatureCollection = async () => {
    // legacy sources
    const featureCollection = await getGeoJsonFeatureCollectionGoldeimer()
    const featureCollectionVca = await getGeoJsonFeatureCollectionVca()

    featureCollection.features = featureCollection.features.concat(
        featureCollectionVca.features
    )

    return featureCollection
}

export default getGeoJsonFeatureCollection
