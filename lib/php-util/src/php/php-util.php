<?php
/// -------------------------------- php util ---------------------------------
/// Free utility functions, that the damn language lacks.

namespace Goldeimer\WordPress\WordPressTheme;

function endsWith($haystack, $needle)
{
    $length = strlen($needle);

    if ($length === 0)
    {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}
