<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');
    requireOnce('campaign/campaign.pledge.query');

    requireOnce('util/util.get-client-ip');
    requireOnce('util/util.get-user-agent-string');

    const PREFIX_PLEDGE_HASH = SLUG_PLEDGE_HASH . '-';

    function generatePledgeHash(
        string $prefix = PREFIX_PLEDGE_HASH
    )
    {
        $clientIp = getClientIp();

        return $prefix . base64_encode(
            md5(
                $clientIp ? $clientIp : ''
                . getUserAgentString()
            )
        );
    }

    function hasRecentPledgeHash(
        string $pledgeHash,
        int $campaignId = null,
        int $maxAgeInDays = 14
    )
    {
        return (bool) queryPledges([
            'campaignId' => $campaignId,
            'maxAgeInDays' => $maxAgeInDays,
            'pledgeHash' => $pledgeHash
        ]);
    }
}
