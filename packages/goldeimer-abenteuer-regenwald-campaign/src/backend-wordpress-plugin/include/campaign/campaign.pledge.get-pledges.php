<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');

    function getPledges(int $campaignId)
    {
        $pledges = get_post_meta(
            $campaignId,
            SLUG_PLEDGE_HASH
        );

        if (!$pledges) return [];

        return $pledges;
    }
}
