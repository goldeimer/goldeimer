import axios from 'axios'

import { BRAND, MERCHANT_TYPE } from 'reducers/MerchantMap/taxonomies'
import parseGoogleSheet from 'util/parseGoogleSheet'

const ENDPOINT_URL_VCA = 'https://www.goldeimer.de/api/merchants'

const GOOGLE_SPREADSHEET_URL =
'https://docs.google.com/spreadsheets/d/e/2PACX-1vRuJMztp6DfBGPv5X1ZvRhNUL95-GTXoxADEhh3XiWzmZYyaWrytx3E4-_8eb7AkW_nFuuj9Nn5fJoh/pub?gid=164271551&single=true&output=csv'

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
                    brand: BRAND.Goldeimer,
                    merchantType:
                        entry.l === 'Großmengen'
                            ? MERCHANT_TYPE.Wholesale
                            : entry.l === 'Online-Shops'
                                ? MERCHANT_TYPE.OnlineShop
                                : MERCHANT_TYPE.Retail,
                    name: entry.Title,
                    url: entry.Description
                }
            }
        )
    )
})

const getMerchantGeoJsonGoldeimer = async () => {
    const result = await parseGoogleSheet(GOOGLE_SPREADSHEET_URL)

    return legacyGoldeimerDataToGeoJson(result)
}

const getMerchantGeoJsonVca = async () => {
    try {
        const response = await axios.get(ENDPOINT_URL_VCA)

        return response.data
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log(error)

        return null
    }
}

const getGeoJsonSource = async () => {
    // legacy sources
    const geoJson = await getMerchantGeoJsonGoldeimer()
    const geoJsonVca = await getMerchantGeoJsonVca()

    geoJson.features = geoJson.features.concat(geoJsonVca.features)

    return geoJson
}

export default getGeoJsonSource
