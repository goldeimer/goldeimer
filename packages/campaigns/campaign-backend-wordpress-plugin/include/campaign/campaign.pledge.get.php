<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.pledge.query');

    function getPledges(
        int $campaignId,
        int $limit = 10,
        int $offset = 0
    ) {
        return queryPledges([
            'campaignId'    => $campaignId,
            'fields'        => 'all',
            'limit'         => $limit,
            'offset'        => $offset
        ]);
    }
}
