<?php

// declare(strict_types=1);

namespace Goldeimer\WordPressUtil;

final class WebpackAssetLoader extends WebpackAssetLoaderImpl
{
    private $pkgAbspath = '';
    private $shouldEnqueue = '';

    public function __construct(
        $pkgAbspath = null,
        $shouldEnqueue = true
    )
    {
        $this->pkgAbspath = $pkgAbspath;
        $this->shouldEnqueue = $shouldEnqueue;
    }

    public function registerAssets($pkgAbspath = null)
    {
        if ($pkgAbspath) {
            $this->pkgAbspath = $pkgAbspath;
        }

        \add_action(
            'wp_enqueue_scripts',
            [$this, 'registerAssetsCallback']
        );
    }

    private function registerAssetsCallback()
    {
        self::_registerAssets(
            $this->pkgAbspath,
            $this->shouldEnqueue
        );
    }
}
