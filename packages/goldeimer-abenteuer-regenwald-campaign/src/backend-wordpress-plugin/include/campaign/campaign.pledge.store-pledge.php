<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.pledge.generate-pledge-hash');
    requireOnce('campaign/campaign.pledge.is-pledge-hash-stored');

    function storePledge(int $campaignId)
    {
        $pledgeHash = generatePledgeHash();

        if (
            isPledgeHashStored(
                $pledgeHash,
                $campaignId
            )
        ) {
            return false;
        }

        return (bool) add_post_meta(
            $campaignId,
            SLUG_PLEDGE_HASH,
            $pledgeHash
        );
    }
}
