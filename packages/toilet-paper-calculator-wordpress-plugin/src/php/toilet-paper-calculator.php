<?php

/*
Plugin Name: @@PACKAGE_SCOPED_NAME_TITLE_CASE@@
Plugin URI: @@REPOSITORY_URI@@
Description: @@DESCRIPTION@@
Version: @@VERSION@@
Author: @@AUTHOR@@
Author URI: @@AUTHOR_URI@@
Text Domain: @@TEXT_DOMAIN@@
Domain Path: /lang/
*/

namespace Goldeimer
{
    const SLUG_ORGANIZATION = 'goldeimer';

    function requireOnce(string $relPath)
    {
        require_once dirname(__FILE__)
            . '\/include\/'
            . $relPath
            . '.php';
    }

    requireOnce('api/api');
    requireOnce('campaign/campaign');
}
