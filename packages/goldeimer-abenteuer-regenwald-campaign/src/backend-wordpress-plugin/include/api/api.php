<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/api/api.constants.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/api/api.controller.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/api/api.util.php';

function onRestApiInit()
{
    $controller = new WpRestControllerAbenteuerRegenwald();

    $controller->registerRoutes();
}

function onPluginsLoaded()
{
    add_action(
        'rest_api_init',
        'onRestApiInit'
    );
}

add_action(
    'plugins_loaded',
    'onPluginsLoaded'
);
