<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/settings/settings.constants.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/settings/settings.util.php';

/// ----- content --------------------------------------------------------------

function settingsPage()
{
    echo '<h2>Abenteuer Regenwald Campaign</h2>';
}

function settingsSection()
{
    echo '<p>Abenteuer Regenwald Campaign &gt; Settings</p>';
}

function settingsFieldTreeCount()
{
    $currentValue = getTreeCount();

    echo '<input type="number" name="'
        . SETTINGS.abenteuerRegenwaldCampaign.sections.main.fields.treeCount.slug
        . '" value="'
        . isset( $currentValue ) ? esc_attr( $currentValue ) : ''
        . '">';
}

/// ----- (hooked) callbacks ---------------------------------------------------

function settingsInit()
{
    register_setting(
        SETTINGS.abenteuerRegenwaldCampaign.slug,
        SETTINGS.abenteuerRegenwaldCampaign.sections.main.fields.treeCount.slug,
        array(
            'type' => 'number',
            'sanitize_callback' => 'absint',
            'default' => 0,
            'show_in_rest' => true
        )
    );
}

function adminMenuInit()
{
    settingsInit();

    add_options_page(
        'Abenteuer Regenwald',
        'Abenteuer Regenwald',
        'manage_options',
        SETTINGS.abenteuerRegenwaldCampaign.slug,
        'settingsPage'
    );

    add_settings_section(
        SETTINGS.abenteuerRegenwaldCampaign.sections.main.slug,
        'Abenteuer Regenwald: Main Settings',
        'settingsSection',
        SETTINGS.abenteuerRegenwaldCampaign.slug
    );

    add_settings_field(
        'goldeimer_settings_field_tree_count',
        'Tree Count',
        'settingsFieldTreeCount',
        SETTINGS.abenteuerRegenwaldCampaign.slug,
        SETTINGS.abenteuerRegenwaldCampaign.sections.main.slug
    );
}

/// ----- hooking into WordPress -----------------------------------------------

add_action(
    'init',
    'settingsInit'
);

add_action(
    'admin_menu',
    'adminMenuInit'
);
