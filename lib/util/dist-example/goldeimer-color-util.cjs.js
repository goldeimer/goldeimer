'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumUtil = require('@goldeimer/enum');

exports.PaletteKey = void 0;

(function (PaletteKey) {
  PaletteKey[PaletteKey["Error"] = 0] = "Error";
  PaletteKey[PaletteKey["Info"] = 1] = "Info";
  PaletteKey[PaletteKey["Success"] = 2] = "Success";
  PaletteKey[PaletteKey["Warning"] = 3] = "Warning";
})(exports.PaletteKey || (exports.PaletteKey = {}));

const palettePath = value => `palette.${enumUtil.lowerCaseKey(exports.PaletteKey, value)}.main`;

const enum2ColorPalettePath = mapper => value => palettePath(enumUtil.$enum.mapValue(value).with(mapper));

exports.enum2ColorPalettePath = enum2ColorPalettePath;
exports.palettePath = palettePath;
//# sourceMappingURL=goldeimer-color-util.cjs.js.map
