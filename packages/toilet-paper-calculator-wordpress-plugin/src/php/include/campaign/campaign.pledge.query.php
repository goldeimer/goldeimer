<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');

    function queryPledges($args)
    {
        $parsedArgs = wp_parse_args(
            $args, [
                'campaignId' => 0,
                'count' => false,
                'fields' => 'ids',
                'limit' => 1,
                'maxAgeInDays' => null,
                'pledgeHash' => null
            ]
        );

        $queryArgs = [
            'count'     => $parsedArgs['count'],
            'fields'    => $parsedArgs['fields'],
            'number'    => $parsedArgs['limit'],
            'post_id'   => $parsedArgs['campaignId'],
            'post_type' => POST_TYPE_KEY,
            'type'      => COMMENT_TYPE_KEY
        ];

        if ($parsedArgs['maxAgeInDays']) {
            $queryArgs['date_query'] = [[
                'after'     => $parsedArgs['maxAgeInDays'] . ' days ago',
                'inclusive' => true
            ]];
        }

        if ($parsedArgs['pledgeHash']) {
            $queryArgs['meta_query'] = [[
                'key' => SLUG_PLEDGE_HASH,
                'value' => $parsedArgs['pledgeHash']
            ]];
        }

        $commentQuery = new \WP_Comment_Query();

        return $commentQuery->query($args);
    }
}
