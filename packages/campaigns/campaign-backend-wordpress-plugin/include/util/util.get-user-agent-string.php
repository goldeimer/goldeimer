<?php

namespace Goldeimer
{
    function getUserAgentString()
    {
        return $_SERVER['HTTP_USER_AGENT'] ? $_SERVER['HTTP_USER_AGENT'] : '';
    }
}
