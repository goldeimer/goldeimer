<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/api/api.constants.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/api/api.controller.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/api/api.util.php';

$controller = WpRestControllerAbenteuerRegenwald();

add_action(
    'rest_api_init',
    $controller->registerRoutes()
);
