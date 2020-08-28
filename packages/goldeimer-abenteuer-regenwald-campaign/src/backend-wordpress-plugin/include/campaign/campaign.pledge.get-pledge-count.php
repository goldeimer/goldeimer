<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.pledge.get-pledges');

    function getPledgeCount($campaignId)
    {
        return count(
            getPledges($campaignId)
        );
    }
}
