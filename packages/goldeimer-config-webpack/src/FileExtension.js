/// @enum {string} FileExtension
///
/// Used to populate webpack's `resolve` configuration directives.

module.exports = [[

// ----- logic -------------------------------------------------------------
'code', [
    '.js', '.jsx', '.json', '.ts', '.tsx', '.wasm']], [

// ----- config ------------------------------------------------------------
'cfg', [
    '.cfg', '.config', '.config.js', '.config.json', '.ini', 'rc', '.secret']], [

// ----- static assets: images ---------------------------------------------
'img', [
    '.svg', '.png', '.jpg', '.jpeg', '.ico']], [

// ----- static assets: text -----------------------------------------------
'txt', [
    '.md', '.txt', '.pdf']]

// -------------------------------------------------------------------------
].reduce((acc, [
    category,
    extensions
]) => ({
    ...acc,
    [category]: extensions,
    all: [...acc.all, extensions]
}), { all: [] })
