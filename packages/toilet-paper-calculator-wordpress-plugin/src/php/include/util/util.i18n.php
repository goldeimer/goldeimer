<?php

namespace Goldeimer {
    const TEXT_DOMAIN = 'goldeimer';

    function __(string $text)
    {
        return \__($text, TEXT_DOMAIN);
    }
}
