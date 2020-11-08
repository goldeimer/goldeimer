<?php

/*
Plugin Name: Goldeimer | Pledge Campaigns
Plugin URI: https://github.com/Goldeimer/goldeimer-web-apps/packages/goldeimer-abenteuer-regenwald-campaign
Description: API to retrieve and update the current number of pledges given, admin UI to manage data.
Version: 0.0.2
Author: @AUTHOR@
Author URI: @AUTHOR_URI@
Text Domain: @TEXT_DOMAIN@
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
