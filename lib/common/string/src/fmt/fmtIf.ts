export type PrefixSuffix = [
    prefix?: string,
    suffix?: string
]

export function fmtIf(
    value?: string,
    ...[prefix, suffix]: PrefixSuffix
 ): string {
    if (!value) {
        return ''
    }

    return `${prefix ?? ''}${value}${suffix ?? ''}`
}

export function prefixIf(
    value?: string,
    prefix?: string,
) {
    return fmtIf(value, prefix)
}

export function suffixIf(
    value?: string,
    suffix?: string,
) {
    return fmtIf(value, undefined, suffix)
}
