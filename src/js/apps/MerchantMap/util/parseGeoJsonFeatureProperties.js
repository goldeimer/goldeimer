/// TODO:
/// This is a hacky ad-hoc fix. Solve in more robust a fashion.
/// Out of the box, `mapbox-gl-js` does not support nested property values.
const parseGeoJsonFeatureProperties = (feature) =>
{
    const keysOfNestedProperties = [
        'address',
        'brands',
    ];

    keysOfNestedProperties.forEach(
        (key, index) => {
            try
            {
                feature.properties[key] = JSON.parse(feature.properties[key]);
            }
            catch (error)
            {
                console.log(key);
                console.log(error);
            }
        }
    );

    return feature;
};


export default parseGeoJsonFeatureProperties;
