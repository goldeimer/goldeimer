<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');

    function isCampaignId(int $campaignId)
    {
        return POST_TYPE_KEY === get_post_type($campaignId);
    }
}
