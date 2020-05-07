<?php


/// ------------------------- toiletpaper calculator --------------------------
/// @shortcode [goldeimer-toilet-paper-calculator]


const SCRIPT_HANDLE_TOILET_PAPER_CALCULATOR =
    'goldeimer-toilet-paper-calculator-script-handle';


function registerToiletPaperCalculator()
{
    wp_register_script(
        SCRIPT_HANDLE_TOILET_PAPER_CALCULATOR,
        get_stylesheet_directory_uri() .
            '/static/js/toilet_paper_calculator.bundle.js',
        array(),
        '1',
        true
    );
}

add_action(
    'wp_enqueue_scripts',
    'registerToiletPaperCalculator'
);


function shortcodeToiletPaperCalculator($attributes)
{
    wp_enqueue_script(SCRIPT_HANDLE_TOILET_PAPER_CALCULATOR);

    return '<div id="react-app-container-toilet-paper-calculator"></div>';
}

add_shortcode(
    'goldeimer-toilet-paper-calculator',
    'shortcodeToiletPaperCalculator'
);
