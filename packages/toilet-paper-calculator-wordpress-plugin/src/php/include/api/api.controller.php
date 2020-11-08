<?php

namespace Goldeimer
{
    require('api/api.constants');
    require('api/api.handle-pledge-request');

    class ApiController extends \WP_REST_Controller
    {
        static $entityRouteBase = '/' . SLUG_CAMPAIGN . '/(?P<id>[\d]+)';

        public function registerRoutes()
        {
            register_rest_route(
                API_NAMESPACE,
                ApiController::$entityRouteBase,
                [
                    [
                        'methods'               => \WP_REST_Server::READABLE,
                        'callback'              => [ $this, 'getCampaign' ],
                        'permission_callback'   => '__return_true',
                        'args'                  => [],
                    ],
                    'schema' => [
                        '$schema'               => 'http://json-schema.org/draft-04/schema#',
                        'title'                 => SLUG_CAMPAIGN,
                        'type'                  => 'object',
                        'properties'            => [
                            'name'  => [
                                'type' => 'string',
                            ],
                            'pledgeCount' => [
                                'type' => 'positiveIntegerDefault0'
                            ]
                        ]
                    ]
                ]
            );

            register_rest_route(
                API_NAMESPACE,
                ApiController::$entityRouteBase . '/pledge',
                [
                    [
                        'methods'             => \WP_REST_Server::CREATABLE,
                        'callback'            => [ $this, 'handlePledgeRequest' ],
                        'permission_callback' => '__return_true',
                        'args'                => [],
                    ],
                    'schema' => [
                        '$schema'               => 'http://json-schema.org/draft-04/schema#',
                        'title'                 => 'pledge',
                        'type'                  => 'object',
                        'properties'            => [
                            'name'  => [
                                'type' => 'string',
                            ],
                            'pledge-count' => [
                                'type' => 'positiveIntegerDefault0'
                            ]
                        ]
                    ]
                ]
            );
        }

/// ----- request handler ------------------------------------------------------

    /// Retrieve the currently stored value
    ///
    /// @param WP_REST_Request $request Full data about the request.
    /// @return WP_Error|WP_REST_Response
    public function getCampaign( $request )
    {

        try {
            return new WP_REST_Response(
                $this->prepareForHttpResponse(
                    getPeopleCount(),
                    $request
                ),
                200
            );
        } catch (Exception $e) {
            return new WP_Error(
                PEOPLE_COUNTER_RESOURCE_SLUG . '-read-error',
                'Failed to retrieve value: ' . $e->getMessage()
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
                $this->prepareForHttpResponse(
                    setPeopleCount(
                        $this->prepareForDatabase( $request )
                    ),
                    $request
                ),
                200
            );
        } catch (Exception $e) {
            return new WP_Error(
                PEOPLE_COUNTER_RESOURCE_SLUG . '-write-error',
                'Failed to update value: ' . $e->getMessage()
            );
        }
    }

/// ----- sanitization ----------------------------------------------------------

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
        ];
    }
}
