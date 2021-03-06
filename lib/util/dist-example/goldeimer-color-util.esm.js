import { lowerCaseKey, $enum } from '@goldeimer/enum-util';

var PaletteKey;

(function (PaletteKey) {
  PaletteKey[PaletteKey["Error"] = 0] = "Error";
  PaletteKey[PaletteKey["Info"] = 1] = "Info";
  PaletteKey[PaletteKey["Success"] = 2] = "Success";
  PaletteKey[PaletteKey["Warning"] = 3] = "Warning";
})(PaletteKey || (PaletteKey = {}));

const palettePath = value => `palette.${lowerCaseKey(PaletteKey, value)}.main`;

const enum2ColorPalettePath = mapper => value => palettePath($enum.mapValue(value).with(mapper));

export { PaletteKey, enum2ColorPalettePath, palettePath };
//# sourceMappingURL=goldeimer-color-util.esm.js.map
