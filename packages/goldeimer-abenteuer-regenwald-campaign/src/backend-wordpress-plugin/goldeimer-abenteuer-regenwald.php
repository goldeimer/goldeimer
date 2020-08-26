<?php
/*
Plugin Name: Goldeimer Abenteur Regenwald
Plugin URI: https://github.com/Goldeimer/goldeimer-web-apps/packages/goldeimer-abenteuer-regenwald
Description: API to retrieve and update the current number of trees planted.
Version: 0.0.1
Author: @AUTHOR@
Author URI: @AUTHOR_URI@
Text Domain: goldeimer-abenteur-regenwald
Domain Path: /lang/
*/


if (! defined('GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH'))
{
    define(
        'GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH',
        dirname(__FILE__)
    );
}

require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/settings/settings.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/api/api.php';
