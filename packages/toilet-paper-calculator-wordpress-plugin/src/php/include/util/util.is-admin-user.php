<?php

namespace Goldeimer
{
    function isAdminUser()
    {
        return in_array(
            'administrator',
            wp_get_current_user()->roles
        );
    }
}
