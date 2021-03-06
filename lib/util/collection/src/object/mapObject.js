export const mapObject = (
    obj,
    fn
) => Object.fromEntries(
    Object.entries(obj).map(
        ([k, v], i) => [k, fn(v, k, i)]
    )
)
