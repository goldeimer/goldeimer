<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/settings/settings.constants.php';

function getTreeCount()
{
    return get_option(
        SETTINGS.abenteuerRegenwald.sections.main.fields.treeCount.slug,
        SETTINGS.abenteuerRegenwald.sections.main.fields.treeCount.defaultValue
    )
}

function setTreeCount( $value )
{
    return update_option(
        SETTINGS.abenteuerRegenwald.sections.main.fields.treeCount.slug,
        $value
    )
}
