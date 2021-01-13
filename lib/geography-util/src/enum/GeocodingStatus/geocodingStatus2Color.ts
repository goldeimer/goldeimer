import {
    enum2ColorPalettePath,
    PaletteKey
} from '@goldeimer/color-util'

import { GeocodingStatus } from './GeocodingStatus'

export const GeocodingStatus2ColorPaletteKey = {
    [GeocodingStatus.NotAttempted]: PaletteKey.Info,
    [GeocodingStatus.Failed]: PaletteKey.Error,
    [GeocodingStatus.Found]: PaletteKey.Success,
    [GeocodingStatus.Outdated]: PaletteKey.Warning
}

export const geocodingStatus2ColorPalettePath = enum2ColorPalettePath(
    GeocodingStatus2ColorPaletteKey
)
