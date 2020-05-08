/// @brief Top-level enumerations.
///
/// Employed for filtering map markers / results.
///
/// TODO(Johannes):
/// Make dynamic, define on the backend side (once we have one).

/// ---------------------------------- util -----------------------------------

const makeEnumObject = (id, label) => ({
    id,
    label
})

const makeIdEnum = (objectEnum) => Object.fromEntries(
    Object.entries(objectEnum).map(
        ([key, object]) => ([key, object.id])
    )
)

/// ------------------------------- entry enums -------------------------------

const BRAND = {
    Goldeimer: makeEnumObject('goldeimer', 'Goldeimer'),
    VivaConAgua: makeEnumObject('vca', 'Viva con Agua')
}

const BRAND_ID = makeIdEnum(BRAND)

const MERCHANT_TYPE = {
    Retail: makeEnumObject('retail', 'Einzelhandel'),
    Wholesale: makeEnumObject('wholesale', 'Großhandel'),
    DeliveryService: makeEnumObject('delivery', 'Lieferservice'),
    OnlineShop: makeEnumObject('online', 'Online Shop')
}

const MERCHANT_TYPE_ID = makeIdEnum(MERCHANT_TYPE)

export {
    BRAND,
    BRAND_ID,
    MERCHANT_TYPE,
    MERCHANT_TYPE_ID
}
