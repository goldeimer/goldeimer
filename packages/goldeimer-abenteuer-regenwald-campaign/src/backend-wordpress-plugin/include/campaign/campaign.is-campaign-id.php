<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');

    function isCampaignId(int $postId)
    {
        return SLUG_CAMPAIGN === get_post_type($postId);
    }
}
