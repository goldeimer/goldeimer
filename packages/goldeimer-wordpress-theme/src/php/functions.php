<?php


if (! defined('GOLDEIMER_THEME_ABSPATH'))
{
    define(
        'GOLDEIMER_THEME_ABSPATH',
        get_stylesheet_directory()
    );
}


require_once GOLDEIMER_THEME_ABSPATH.'/include/filter-p-bank.php';
require_once GOLDEIMER_THEME_ABSPATH.'/shortcode/shortcode-iframe-embed.php';
require_once GOLDEIMER_THEME_ABSPATH.'/shortcode/shortcode-merchant-map.php';
require_once GOLDEIMER_THEME_ABSPATH.'/shortcode/shortcode-toilet-paper-calculator.php';
require_once GOLDEIMER_THEME_ABSPATH.'/util/dev-util.php';
