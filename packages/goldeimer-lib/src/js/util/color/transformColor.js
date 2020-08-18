const hexToInt = (hex) => parseInt(hex, 16)

const mapHexToInt = (arr) => arr.map((val) => hexToInt(val))

const hexToRgbValues = (hex) => {
    const hx = hex.startsWith('#') ? hex.slice(1) : hex

    if (hx.length === 6) {
        return mapHexToInt([
            `0x${hx[0]}${hx[1]}`, `0x${hx[2]}${hx[3]}`, `0x${hx[4]}${hx[5]}`
        ])
    }

    if (hx.length === 3) {
        return mapHexToInt([
            `0x${hx[0]}${hx[0]}`,
            `0x${hx[1]}${hx[1]}`,
            `0x${hx[2]}${hx[2]}`
        ])
    }

    throw new RangeError(
        `${hex} is not a valid 6- or 3-digit hex color value. (Leading # are optional.)`
    )
}

const hexToRgbCss = (hex, alpha = null) => {
    const [r, g, b] = hexToRgbValues(hex)

    return `rgb${alpha !== null ? 'a' : ''}(${r}, ${g}, ${b}${alpha !== null ? `, ${alpha}` : ''})`
}

const hexToRgbaCss = (hex, alpha = 1) => hexToRgbCss(hex, alpha)

const isInRgbRange = (val) => val >= 0 && val <= 255

const rgbCssToRgbValues = (val) => {
    const match = val.match(
        /^\s*?rgba?\(\s*?(\d{1,3})\s*?,\s*?(\d{1,3})\s*?,\s*?(\d{1,3})/u
    )

    if (match && match.length === 4) {
        if (
            isInRgbRange(match[1]) &&
            isInRgbRange(match[2]) &&
            isInRgbRange(match[3])
        ) {
            return match.slice(1, 4)
        }
    }

    throw new RangeError(
        `Failed to extract rgb values from '${val}'. Must be a valid 'rgba?(...)' css color value.`
    )
}

export {
    hexToRgbCss,
    hexToRgbaCss,
    hexToRgbValues,
    rgbCssToRgbValues
}
