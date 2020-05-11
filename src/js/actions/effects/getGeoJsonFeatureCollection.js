// import axios from 'axios'
import validUrl from 'valid-url'

import { BRAND, MERCHANT_TYPE } from 'enum/taxonomies'
import parseGoogleSheet from 'util/parseGoogleSheet'

// const ENDPOINT_URL_VCA = 'https://www.goldeimer.de/api/merchants'

/* eslint-disable max-len */
const GOOGLE_SPREADSHEET_PUBID_GOLDEIMER =
'2PACX-1vRuJMztp6DfBGPv5X1ZvRhNUL95-GTXoxADEhh3XiWzmZYyaWrytx3E4-_8eb7AkW_nFuuj9Nn5fJoh'
const GOOGLE_SPREADSHEET_SHEET_GID_GOLDEIMER = '164271551'

const GOOGLE_SPREADSHEET_PUBID_VCA =
'2PACX-1vSmOzTOK5Tlx0AA-gR4h1efPCWD9q2VNq2gzN8kQFVdCw_vHEv65t6uppj7iwJBc7_XyGvDoBk8jb-Q'
const GOOGLE_SPREADSHEET_SHEET_GID_VCA = '164271551'

const makeGoogleSpreadsheetUrl = (pubId, gid) => (
    `https://docs.google.com/spreadsheets/d/e/${pubId}/pub?gid=${gid}&single=true&output=csv`
)
/* eslint-enable max-len */

const convertMerchantType = (legacyValue) => {
    switch (legacyValue) {
    case 'Getränkefachgroßhandel':
    case 'Großmengen':
        return MERCHANT_TYPE.wholesale

    case 'Online-Shops':
        return MERCHANT_TYPE.online

    case 'Lieferservice':
        return MERCHANT_TYPE.delivery

    default:
        // 'Einzelhandel'
        // 'Einzelhandel (Kiste)'
        return MERCHANT_TYPE.retail
    }
}

const spreadsheetDataToGeoJsonGoldeimer = (data) => ({
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
                    brands: [BRAND.goldeimer],
                    city: entry.Stadt,
                    country: 'Deutschland',
                    merchantTypes: [convertMerchantType(entry.l)],
                    name: entry.Title,
                    street: entry.Location,
                    url: entry.Description
                }
            }
        )
    )
})

const spreadsheetDataToGeoJsonVca = (data) => ({
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
                    brands: [BRAND.vca],
                    city: entry.City,
                    country: entry.Country,
                    merchantTypes: [convertMerchantType(entry.Group)],
                    name: entry.Title,
                    street: entry.Street,
                    url: entry.Description
                }
            }
        )
    )
})

const getGeoJsonFeatureCollectionGoldeimer = async () => {
    const result = await parseGoogleSheet(
        makeGoogleSpreadsheetUrl(
            GOOGLE_SPREADSHEET_PUBID_GOLDEIMER,
            GOOGLE_SPREADSHEET_SHEET_GID_GOLDEIMER
        )
    )

    return spreadsheetDataToGeoJsonGoldeimer(result)
}

const getGeoJsonFeatureCollectionVca = async () => {
    const result = await parseGoogleSheet(
        makeGoogleSpreadsheetUrl(
            GOOGLE_SPREADSHEET_PUBID_VCA,
            GOOGLE_SPREADSHEET_SHEET_GID_VCA
        )
    )

    return spreadsheetDataToGeoJsonVca(result)
}

// TODO: Deprecate.
// const getGeoJsonFeatureCollectionVcaFromLegacyDb = async () => {
//     try {
//         const response = await axios.get(ENDPOINT_URL_VCA)
//
//         return response.data
//     } catch (error) {
//         /* eslint-disable-next-line no-console */
//         console.log(error)
//
//         return null
//     }
// }

const getGeoJsonFeatureCollection = async () => {
    // legacy sources
    const featureCollection = await getGeoJsonFeatureCollectionGoldeimer()
    const featureCollectionVca = await getGeoJsonFeatureCollectionVca()

    featureCollection.features = featureCollection.features.concat(
        featureCollectionVca.features
    )

    featureCollection.features.forEach(
        (feature, index) => {
            featureCollection.features[index].properties = Object.fromEntries(
                Object.entries(feature.properties).map(
                    ([propertyName, propertyValue]) => {
                        let newPropertyValue = propertyValue
                        if (typeof propertyValue === 'string') {
                            newPropertyValue = propertyValue.replace(
                                /(^\s*)|(\s$)/g,
                                ''
                            ).replace(
                                /\s{2,}/g,
                                ' '
                            )
                        }

                        if (propertyName === 'url') {
                            if (!validUrl.isUri(newPropertyValue)) {
                                newPropertyValue = ''
                            }
                        }

                        return [
                            propertyName,
                            newPropertyValue
                        ]
                    }
                )
            )
        }
    )

    return featureCollection
}

export default getGeoJsonFeatureCollection
