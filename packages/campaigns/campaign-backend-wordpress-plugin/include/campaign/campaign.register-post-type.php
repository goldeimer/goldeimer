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
            POST_TYPE_KEY, [
            'labels' => [
                'name' => __('Pledge Campaign')
            ],
            'description' => __('Campaigns to which visitors can pledge
participation. Pledges are stored as post comments. Statistics, such as
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
            POST_TYPE_KEY,
            SLUG_PLEDGE_COUNT, [
                'type' => 'integer',
                'description' => __('Number of pledges given so far'),
                'single' => true
            ]
        );

        add_action(
            sprintf(
                'manage_%s_posts_custom_column',
                POST_TYPE_KEY
            ),
            'registerPledgeCountColumn',
            10,
            2
        );
    }
}
