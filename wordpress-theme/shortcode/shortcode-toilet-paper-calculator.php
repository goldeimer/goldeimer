<?php


# -------------------------- toiletpaper calculator ---------------------------


const SCRIPT_HANDLE = 'goldeimer-toilet-paper-calculator-standalone-bundle';


function registerToiletPaperCalculator()
{
    wp_register_script(
        SCRIPT_HANDLE,
        plugins_url(
            'static/js/toilet_paper_calculator_standalone.bundle.js',
            __FILE__
        ),
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
    wp_enqueue_script(SCRIPT_HANDLE);

    return '<div id="react-app-container-toilet-paper-calculator"></div>';
}

add_shortcode(
    'goldeimer-toilet-paper-calculator',
    'shortcodeToiletPaperCalculator'
);


?>
