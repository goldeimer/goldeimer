import SparkMd5 from 'spark-md5'
import { isString } from 'typechecker'
import validUrl from 'valid-url'

import parseGoogleSheet from '@lib/util/parseGoogleSheet'

import { BRAND, MERCHANT_TYPE } from '@map/config/taxonomies'

import { GOOGLE_SHEETS_API_KEY } from '@config/apiKeys'

/* eslint-disable max-len */
const GOOGLE_SPREADSHEET_ID_GOLDEIMER =
'1Uk34qKL3uI1DRjHcFAETIj9dXJ0QEiWZFtHHBHY_SRo'

const GOOGLE_SPREADSHEET_ID_VCA =
'1UBJ6lq4583McjU8nt2prIsMN_e8n_pJbsTb4zIg5X74'

const makeGoogleSpreadsheetUrl = ({
    apiKey,
    spreadsheetId,
    sheetName
}) => (
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`
)
/* eslint-enable max-len */

const convertMerchantType = (legacyValue) => {
    switch (legacyValue) {
        case 'Getränkefachgroßhandel':
        case 'Großmengen':
            return MERCHANT_TYPE.wholesale

        case 'Online-Shops':
            return MERCHANT_TYPE.ecommerce

        case 'Lieferservice':
            return MERCHANT_TYPE.delivery

        default:
        // 'Einzelhandel'
        // 'Einzelhandel (Kiste)'
            return MERCHANT_TYPE.retail
    }
}

const spreadsheetDataToGeoJsonGoldeimer = (data) => Array.prototype.map.call(
    data,
    (entry) => ({
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
            placeName: entry.Title,
            street: entry.Location,
            url: entry.Description
        }
    })
)

const spreadsheetDataToGeoJsonVca = (data) => Array.prototype.map.call(
    data,
    (entry) => ({
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
            placeName: entry.Title,
            street: entry.Street,
            url: entry.Description
        }
    })
)

const getFeaturesGoldeimer = async () => {
    const result = await parseGoogleSheet(
        makeGoogleSpreadsheetUrl({
            apiKey: GOOGLE_SHEETS_API_KEY,
            sheetName: 'Points',
            spreadsheetId: GOOGLE_SPREADSHEET_ID_GOLDEIMER
        })
    )

    return spreadsheetDataToGeoJsonGoldeimer(result.data)
}

const getFeaturesVca = async () => {
    const result = await parseGoogleSheet(
        makeGoogleSpreadsheetUrl({
            apiKey: GOOGLE_SHEETS_API_KEY,
            sheetName: 'Points',
            spreadsheetId: GOOGLE_SPREADSHEET_ID_VCA
        })
    )

    return spreadsheetDataToGeoJsonVca(result.data)
}

const cityToPostCodeAndCity = (city) => {
    const match = city.match(/^\s*?(\d{4,})\s+?(.*)$/u)

    if (!match || match.length < 3) {
        return {
            city,
            postCode: ''
        }
    }

    return {
        city: match[2] || '',
        postCode: match[1] || ''
    }
}

const sanitizeIfString = (value) => {
    if (isString(value)) {
        return value.trim().replace(
            /\s{2,}/g,
            ' '
        ).replace(
            /,{2,}/g,
            ','

        )
    }

    return value
}

const sanitizeUrl = (url) => {
    if (isString(url)) {
        const sanitized = url.trim()

        if (!validUrl.isUri(sanitized)) {
            return ''
        }

        return sanitized
    }

    return ''
}

const sourceRequest = async () => {
    // legacy sources
    const featuresGoldeimer = await getFeaturesGoldeimer()
    const featuresVca = await getFeaturesVca()

    return featuresGoldeimer.concat(featuresVca).reduce((acc, feature) => {
        const placeName = sanitizeIfString(feature.properties.placeName)
        const street = sanitizeIfString(feature.properties.street)

        const accIndex = acc.findIndex(
            // Note:
            // The `street` property holds the full "address line 1"
            // (incl. house/apt number and inner white space(s)).
            (element) => (element.properties.street === street)
        )

        // Deduplicate entries existent in both legacy data sources
        // (brand-separated google sheets).
        if (
            accIndex !== -1 &&
            (
                placeName.substring(0, 5) ===
                acc[accIndex].properties.placeName.substring(0, 5)
            )
        ) {
            const ret = acc

            const accBrands = acc[accIndex].properties.brands
            const newBrands = feature.properties.brands.filter(
                (brand) => !accBrands.includes(brand)
            )

            ret[accIndex].properties.brands = (
                accBrands.concat(newBrands)
            )

            return ret
        }

        return Object.freeze([
            ...acc,
            {
                ...feature,
                properties: {
                    ...feature.properties,
                    ...cityToPostCodeAndCity(feature.properties.city),
                    country: sanitizeIfString(feature.properties.country),
                    id: SparkMd5.hash(`${placeName}:${street}`),
                    placeName,
                    street,
                    url: sanitizeUrl(feature.properties.url)
                }
            }
        ])
    }, [])
}

export default sourceRequest
