<?php

require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/settings/settings.util.php';

require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/api/api.constants.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/api/api.controller.php';
require_once GOLDEIMER_ABENTEUER_REGENWALD_ABSPATH.'/include/api/api.util.php';

class WpRestControllerAbenteuerRegenwald extends WP_REST_Controller
{
    public function registerRoutes() {
        register_rest_route(
            API_NAMESPACE,
            '/' . TREE_COUNT_RESOURCE_SLUG,
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'getValue' ],
                    'permission_callback' => [ $this, 'getValuePermissionsCheck' ],
                    'args'                => [],
                ],
                [
                    'methods'             => WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'updateValue' ],
                    'permission_callback' => [ $this, 'updateValuePermissionsCheck' ],
                    'args'                => $this->get_endpoint_args_for_item_schema( false ),
                ],
                'schema' => 'schema'
            ]
        )

        // register_rest_route(
        //     API_NAMESPACE,
        //     '.' . TREE_COUNT_RESOURCE_SLUG . '/schema',
        //     [
        //         'methods'  => WP_REST_Server::READABLE,
        //         'callback' => array( $this, 'schema' ),
        //     ]
        // );
    }

    public function schema()
    {
        return [
            '$schema'              => 'http://json-schema.org/draft-04/schema#',
            'title'                => TREE_COUNT_RESOURCE_SLUG,
            'type'                 => 'object',
            'properties'           =>  [
                'incrementBy' => [
                    'type'         => 'positiveIntegerDefault0'
                ],
                'value' => [
                    'type'         => 'positiveIntegerDefault0'
                ]
            ]
        ];
    }

/// ----- request handler ------------------------------------------------------

    /// Retrieve the currently stored value
    ///
    /// @param WP_REST_Request $request Full data about the request.
    /// @return WP_Error|WP_REST_Response
    public function getValue( $request )
    {
        try {
            return new WP_REST_Response(
                $this->prepareForHttpResponse(
                    getTreeCount(),
                    $request
                ),
                200
            );
        } catch {
            return new WP_Error(
                TREE_COUNT_RESOURCE_SLUG . '-read-error',
                'Failed to retrieve value.'
            );
        }
    }

    /// Update the currently stored value
    ///
    /// @param WP_REST_Request $request Full data about the request.
    /// @return WP_Error|WP_REST_Response
    public function updateValue( $request )
    {
        try {
            return new WP_REST_Response(
                setTreeCount(
                    $this->prepareForDatabase( $request )
                ),
                200
            );
        } catch {
            return new WP_Error(
                TREE_COUNT_RESOURCE_SLUG . '-write-error',
                'Failed to update value.'
            );
        }
    }

/// ----- sanitization ----------------------------------------------------------

    /// Prepare value for write (create or update) operation
    ///
    /// @param WP_REST_Request $request Request object
    /// @return WP_Error|object $prepared_item
    protected function prepareForDatabase( $request )
    {
        $requestBody = $this->get_json_params()

        $incrementBy = !empty( $requestBody.incrementBy )
            ? $requestBody.incrementBy
            : TREE_COUNT_DEFAULT_INCREMENT

        return [
            'value' => getTreeCount() + incrementBy
        ]
    }

    /// Prepare the item for the HTTP REST response
    ///
    /// @param mixed $value WordPress representation of the value.
    /// @param WP_REST_Request $request Request object.
    /// @return mixed
    protected function prepareForHttpResponse(
        $value,
        $request
    )
    {
        return [
            'value' => $value
        ]
    }

/// ----- permissions ----------------------------------------------------------

    protected function getValuePermissionsCheck( $request )
    {
        // TODO: Check API key of sorts.
        return true
    }

    protected function updateValuePermissionsCheck( $request )
    {
        // TODO:
        // Check API key of sorts.
        // Return early if invalid.

        return ! hasIpAddressRecentlyUpdatedValue(
            getIpAddressOfCurrentRequest(),
            TREE_COUNT_RESOURCE_SLUG
        )
    }
}
