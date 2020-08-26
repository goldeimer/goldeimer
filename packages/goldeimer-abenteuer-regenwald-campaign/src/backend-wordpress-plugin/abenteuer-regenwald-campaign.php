<?php

/*
Plugin Name: Goldeimer | Abenteur Regenwald Campaign
Plugin URI: https://github.com/Goldeimer/goldeimer-web-apps/packages/goldeimer-abenteuer-regenwald-campaign
Description: API to retrieve and update the current number of trees planted, admin UI to manage data.
Version: 0.0.1
Author: @PKG_AUTHOR@
Author URI: @PKG_AUTHOR_URI@
Text Domain: @PKG_NAME@
Domain Path: /lang/
*/

if (! defined('GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH'))
{
    define(
        'GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH',
        dirname(__FILE__)
    );
}

require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/settings/settings.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/api/api.php';
