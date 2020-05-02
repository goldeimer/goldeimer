<?php


/// ------------------------------ merchant map -------------------------------
/// @shortcode [goldeimer-merchant-map]


const SCRIPT_HANDLE = 'goldeimer-merchant-map-standalone-bundle';


function registerMerchantMap()
{
    wp_register_script(
        SCRIPT_HANDLE,
        get_stylesheet_directory_uri() .
            '/static/js/merchant_map_standalone.bundle.js',
        array(),
        '1',
        true
    );
}

add_action(
    'wp_enqueue_scripts',
    'registerMerchantMap'
);


function shortcodeMerchantMap($attributes)
{
    wp_enqueue_script(SCRIPT_HANDLE);

    return '<div id="react-app-container-merchant-map"></div>';
}

add_shortcode(
    'goldeimer-merchant-map',
    'shortcodeMerchantMap'
);
