<?php

namespace Goldeimer\WordPressTheme;

use Goldeimer\WordPressUtil\WebpackAssetLoader;

$loader = new WebpackAssetLoader(GOLDEIMER_THEME_ABSPATH);
$loader->registerAssets();
