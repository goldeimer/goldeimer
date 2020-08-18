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


?>
