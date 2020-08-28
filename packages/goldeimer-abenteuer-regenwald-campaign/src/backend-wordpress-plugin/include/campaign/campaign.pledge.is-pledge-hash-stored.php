<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');

    function isPledgeHashStored(
        string $pledgeHash,
        int $campaignId = null
    )
    {
        $args = [
            'post_type' => SLUG_CAMPAIGN,
            'meta_query' => [[
                'key' => SLUG_PLEDGE_HASH,
                'value' => $pledgeHash
            ]],
            'fields' => 'ids',
            'posts_per_page' => 1
        ];

        if ($campaignId) {
            $args['p'] = $campaignId;
        }

        $query = new \WP_Query();

        return (bool) $query->found_posts;
    }
}
