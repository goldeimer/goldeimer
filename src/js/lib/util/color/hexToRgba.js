const hexToRgba = (hex, alpha = 0) => {
    let r = 0
    let g = 0
    let b = 0

    const hx = hex.startsWith('#') ? hex.slice(1) : hex

    if (hx.length === 3) {
        r = `0x${hx[0]}${hx[0]}`
        g = `0x${hx[1]}${hx[1]}`
        b = `0x${hx[2]}${hx[2]}`
    } else if (hx.length === 6) {
        r = `0x${hx[0]}${hx[1]}`
        g = `0x${hx[2]}${hx[3]}`
        b = `0x${hx[4]}${hx[5]}`
    }

    return `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},${alpha})`
}

export default hexToRgba
