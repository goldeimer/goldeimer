<?php

namespace Goldeimer
{
    requireOnce('api/api.constants');
    requireOnce('api/api.controller');

    function onPluginsLoaded()
    {
        $controller = new ApiController();

        $controller->registerRoutes();
    }

    add_action(
        'plugins_loaded',
        'onPluginsLoaded'
    );
}
