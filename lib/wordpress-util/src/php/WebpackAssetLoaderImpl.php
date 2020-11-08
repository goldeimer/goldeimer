<?php

// declare(strict_types=1);

namespace Goldeimer\WordPressUtil;

class WebpackAssetLoaderImpl
{
    final protected static function _readManifest(string $pkgAbspath)
    {
        return json_decode(
            file_get_contents(
                $pkgAbspath . '/artifacts/manifest.json'
            ),
            true
        );
    }

    final protected static function _handle(string $relpath) : string
    {
        return str_replace(
            '.',
            '-',
            preg_replace(
                '\.\w{2,3}$',
                '',
                array_pop(explode('/', $relpath))
            )
        );
    }

    final protected static function _assetUri(string $relpath) : string
    {
        return get_stylesheet_directory_uri() . '/' . $relpath;
    }

    final protected static function _registerScript(
        string $handle,
        string $relpath
    ) : bool
    {
        return \wp_register_script(
            $handle,
            self::_assetUri($relpath),
            array(),
            null,
            true
        );
    }

    final protected static function _registerStyle(
        string $handle,
        string $relpath
    ) : bool
    {
        return \wp_register_style(
            $handle,
            self::_assetUri($relpath),
            array(),
            null,
            true
        );
    }

    final protected static function _registerAssets(
        string $pkgAbspath,
        bool $shouldEnqueue = true
    ) {
        $manifest = self::_readManifest($pkgAbspath);

        foreach ($manifest['entrypoints'] as $assets) {
            foreach ($assets as $sourceType => $relpath) {
                $handle = self::_handle($relpath);

                switch ($sourceType) {
                    case 'css':
                        $handle = self::_registerStyle($handle, $relpath);

                        if ($shouldEnqueue) {
                            \wp_enqueue_style($handle);
                        }
                        break;

                    case 'js':
                        $handle = self::_registerScript($handle, $relpath);

                        if ($shouldEnqueue) {
                            \wp_enqueue_script($handle);
                        }
                        break;
                }
            }
        }
    }
}
