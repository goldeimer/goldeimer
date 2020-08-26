<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_CAMPAIGN_ABSPATH.'/include/settings/settings.constants.php';

function getTreeCount()
{
    return get_option(
        SETTING_TREE_COUNT_SLUG,
        SETTING_TREE_COUNT_DEFAULT_VALUE
    );
}

function setTreeCount( $value )
{
    return update_option(
        SETTING_TREE_COUNT_SLUG,
        $value
    );
}
