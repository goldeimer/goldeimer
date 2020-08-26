<?php

const MIN_UPDATE_REQUEST_DELAY_PER_IP_IN_HOURS = 24 * 7;

function getIpAddressOfCurrentRequest() {
    return isset($_SERVER['REMOTE_ADDR'])
        ? $_SERVER['REMOTE_ADDR']
        : null;
}

function getRecentIpAddressesHavingUpdatedValue( $optionName )
{
    // TODO:
    // Stub.
    // Add a transient list.
    return [];
}

function hasIpAddressRecentlyUpdatedValue(
    $ipAddress,
    $optionName
)
{
    return in_array(
        $ipAddress,
        getRecentIpAddressesHavingUpdatedValue($optionName)
    );
}
