<?php


require_once GOLDEIMER_THEME_ABSPATH.'/util/php-util.php';


/// -------------------------------- dev util ---------------------------------

// @brief Whether we are running in the local dockerized dev env.
//
// @return bool
function isDevelopmentEnvironment()
{
    return (
        ! empty($_SERVER['HTTP_HOST'])
        && endsWith($_SERVER['HTTP_HOST'], 'goldeimer.lc')
    );
}


// @brief Dumps information on the host's PHP configuration on screen,
//        if requested with the correct `GET` request query arg.
function phpInfoOnQueryArg()
{
    if (! isDevelopmentEnvironment())
    {
        return;
    }

    if (
        ! empty($_GET['phpinfo'])
        && $_GET['phpinfo'] === 'true'
    ) {
        phpinfo();
    }
}

if (isDevelopmentEnvironment())
{
    add_action(
        'wp_loaded',
        'phpInfoOnQueryArg',
        10,
        2
    );
}


?>
