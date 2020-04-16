<?php


if (! defined('GOLDEIMER_THEME_ABSPATH'))
{
    define(
        'GOLDEIMER_THEME_ABSPATH',
        get_stylesheet_directory()
    );
}


require_once(GOLDEIMER_THEME_ABSPATH.'/util/dev-util.php');
require_once(GOLDEIMER_THEME_ABSPATH.'/util/php-util.php');

require_once(GOLDEIMER_THEME_ABSPATH.'/shortcode/shortcode-iframe-embed.php');


/// ---------------------------- 3rd party filters ----------------------------

// TODO(Johannes):
// Figure out why this is needed. Document.
// (Predates my time.)
function av_change_logo($logo)
{
    if (is_page(13893))
    {
        return "http://www.goldeimer.de/wp-content/uploads/2019/06/" .
               "P-Bank_Logo-y.png";
    }

    return $logo;
}

add_filter(
    'avf_logo',
    'av_change_logo'
);


// TODO(Johannes):
// Figure out why this is needed. Document.
// (Predates my time.)
function av_change_logo_link($link)
{
    if (is_page(13893))
    {
        return "#welcome";
    }

    return $link;
}

add_filter(
    'avf_logo_link',
    'av_change_logo_link'
);


?>
