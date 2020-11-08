<?php

namespace Goldeimer
{
    const IP_ADDRESS_KEYS = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'REMOTE_ADDR'
    ];

    function getClientIp()
    {
        foreach (IP_ADDRESS_KEYS as $key)
        {
            if (array_key_exists($key, $_SERVER))
            {
                foreach (
                    array_map(
                        'trim',
                        explode(',', $_SERVER[$key])
                    )
                    as $possibleIpValue
                ) {
                    if (
                        filter_var(
                            $possibleIpValue,
                            FILTER_VALIDATE_IP,
                            FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
                        ) !== false
                    ) {
                        return $possibleIpValue;
                    }
                }
            }
        }

        return null;
    }
}
