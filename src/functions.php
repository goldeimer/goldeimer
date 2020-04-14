<?php


/// -------------------------------- php util ---------------------------------
/// Free utility functions, that the damn language lacks.

function endsWith($haystack, $needle)
{
    $length = strlen($needle);

    if ($length === 0)
    {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}


/// -------------------------------- dev util ---------------------------------

// @brief Dumps information on the host's PHP configuration on screen,
//        if requested with the correct `GET` request query arg.
function devPhpInfo()
{
    if (
        ! empty($_GET['phpinfo'])
        && $_GET['phpinfo'] === 'true'
        && ! empty($_SERVER['HTTP_HOST'])
        && endsWith($_SERVER['HTTP_HOST'], 'goldeimer.lc')
    ) {
        phpinfo();
    }
}

add_action(
    'wp_loaded',
    'devPhpInfo',
    10,
    2
);


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
