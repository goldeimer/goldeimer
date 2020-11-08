<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.pledge.count');
    requireOnce('campaign/campaign.pledge.hash');

    function storePledge(int $campaignId)
    {
        $pledgeHash = generatePledgeHash();

        if (
            hasRecentPledgeHash(
                $pledgeHash,
                $campaignId
            )
        ) {
            return false;
        }

        $wasInserted = (bool) wp_insert_comment([
            'comment_post_ID'   => $campaignId,
            'comment_meta'      => [
                SLUG_PLEDGE_HASH => $pledgeHash
            ],
            'comment_type'      => COMMENT_TYPE_KEY
        ]);

        if ($wasInserted) {
            incrementPledgeCount($campaignId);
        }

        return $wasInserted;
    }
}
