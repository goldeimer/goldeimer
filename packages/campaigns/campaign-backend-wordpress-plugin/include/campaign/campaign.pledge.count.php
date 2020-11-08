<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');
    requireOnce('campaign/campaign.pledge.query');

    const POST_META_KEY = SLUG_PLEDGE_COUNT;

    function getPledgeCount(
        int $campaignId,
        bool $fromCache = true
    ) {
        if (!$fromCache) {
            return queryPledgeCount($campaignId);
        }

        return intval(
            get_post_meta(
                $campaignId,
                POST_META_KEY,
                true
            )
        );
    }

    function incrementPledgeCount(
        int $campaignId,
        int $incrementBy = 1
    ) {
        $oldValue = getPledgeCount($campaignId);
        $newValue = $oldValue + $incrementBy;

        $wasIncremented = setPledgeCount(
            $campaignId,
            $newValue
        );

        return $wasIncremented ? $newValue : $oldValue;
    }

    function queryPledgeCount(int $campaignId)
    {
        $value = queryPledges([
            'campaign'  => $campaignId,
            'count'     => true
        ]);

        setPledgeCount(
            $campaignId,
            $value
        );

        return $value;
    }

    function setPledgeCount(
        int $campaignId,
        int $value
    ) {
        return update_post_meta(
            $campaignId,
            POST_META_KEY,
            $value
        );
    }
}
