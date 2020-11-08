<?php


/// ------------------------------ merchant map -------------------------------
/// @shortcode [goldeimer-merchant-map]


const SCRIPT_HANDLE_MERCHANT_MAP =
    'goldeimer-merchant-map-script-handle';


function registerMerchantMap()
{
    wp_register_script(
        SCRIPT_HANDLE_MERCHANT_MAP,
        get_stylesheet_directory_uri() .
            '/static/js/merchant-map.bundle.js',
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
    wp_enqueue_script(SCRIPT_HANDLE_MERCHANT_MAP);

    return '<div id="react-app-container-merchant-map"></div>';
}

add_shortcode(
    'goldeimer-merchant-map',
    'shortcodeMerchantMap'
);
