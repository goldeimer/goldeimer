<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.constants');
    requireOnce('campaign/campaign.pledge.get-pledge-count');
    requireOnce('util/i18n');

    function registerPledgeCountColumn(
        $columnId,
        $postId
    )
    {
        if (
            $columnId !== SLUG_PLEDGE_COUNT
            || !isCampaignId($postId)
        ) {
            return null;
        }

        return getPledgeCount($postId);
    }

    function registerPostType()
    {
        register_post_type(
            SLUG_CAMPAIGN, [
            'labels' => [
                'name' => __('Pledge Campaign')
            ],
            'description' => __('Campaigns to which visitors can pledge
participation. Pledges are stored as post meta data. Statistics, such as
the current number of pledges are exposed to client-side apps via the
WP_REST_API.'),
            'public' => true,
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_nav_menus' => false,
            'show_in_admin_bar' => false,
            'show_in_rest' => true,
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'menu_position' => 1001,
            'menu_icon' => '',
            'capability_type' => 'post',
            'supports' => [
                'title',
                'author'
            ]]
        );

        register_post_meta(
            SLUG_CAMPAIGN,
            SLUG_PLEDGE_HASH, [
                'type' => 'string',
                'description' => 'Hash of IP address and visitor\'s
 user agent string. Stored to prevent duplicated pledges without
 storing PII (personally identifiable information).',
                'single' => false
            ]
        );

        add_action(
            sprintf('manage_%s_posts_custom_column', SLUG_CAMPAIGN),
            'registerPledgeCountColumn',
            10,
            2
        );
    }
}
