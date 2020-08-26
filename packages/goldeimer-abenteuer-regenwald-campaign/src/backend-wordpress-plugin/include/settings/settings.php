<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/settings/settings.constants.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/settings/settings.util.php';

/// ----- content --------------------------------------------------------------

function settingsPage()
{
    echo '<h2>Abenteuer Regenwald</h2>'
}

function settingsSection()
{
    echo '<p>Abenteuer Regenwald Settings</p>';
}

function settingsFieldTreeCount()
{
    const $currentValue = getTreeCount()

    echo '<input type="number" name="'
        . SETTINGS.abenteuerRegenwald.sections.main.fields.treeCount.slug
        . '" value="'
        . isset( $currentValue ) ? esc_attr( $currentValue ) : ''
        . '">'
}

/// ----- hooked callbacks -----------------------------------------------------

function settingsInit()
{
    register_setting(
        SETTINGS.abenteuerRegenwald.slug,
        SETTINGS.abenteuerRegenwald.sections.main.fields.treeCount.slug,
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
    settingsInit()

    add_options_page(
        'Abenteuer Regenwald',
        'Abenteuer Regenwald',
        'manage_options',
        SETTINGS.abenteuerRegenwald.slug,
        'settingsPage'
    );

    add_settings_section(
        SETTINGS.abenteuerRegenwald.sections.main.slug,
        'Abenteuer Regenwald: Main Settings',
        'settingsSection',
        SETTINGS.abenteuerRegenwald.slug
    );

    add_settings_field(
        'goldeimer_settings_field_tree_count',
        'Tree Count',
        'settingsFieldTreeCount',
        SETTINGS.abenteuerRegenwald.slug,
        SETTINGS.abenteuerRegenwald.sections.main.slug
    );
}

/// ----- hooking --------------------------------------------------------------


add_action(
    'init',
    'settingsInit'
);

add_action(
    'admin_menu',
    'adminMenuInit'
);
