<?php

namespace Goldeimer
{
    function unixNow()
    {
        $now = new \DateTime();

        return $now->getTimestamp();
    }
}
