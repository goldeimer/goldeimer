<?php

namespace Goldeimer
{
    requireOnce('util/util.get-client-ip');
    requireOnce('util/util.get-user-agent-string');

    function generatePledgeHash()
    {
        $clientIp = getClientIp();

        return base64_encode(
            md5(
                $clientIp ? $clientIp : ''
                . getUserAgentString()
            )
        );
    }
}
