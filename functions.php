<?php


/// -------------------------------- php util ---------------------------------
/// php ...

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

function devPhpInfo()
{
    if (
        ! empty($_SERVER['HTTP_HOST'])
        && endsWith($_SERVER['HTTP_HOST'], 'goldeimer.lc')
        && ! empty($_GET['phpinfo'])
        && $_GET['phpinfo'] === 'true'
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

// TODO: Figure out why this is needed. Document.
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


// TODO: Figure out why this is needed. Document.
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
