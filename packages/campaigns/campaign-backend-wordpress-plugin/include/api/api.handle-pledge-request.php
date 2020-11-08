<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.pledge.store');

    const HTTP_STATUS_OK = 200;
    const HTTP_STATUS_FORBIDDEN = 403;

    function handlePledgeRequest(int $campaignId)
    {
        $wasAccepted = storePledge($campaignId);

        return new \WP_REST_Response(
                ['pledgeCount' => getPledgeCount()],
                $wasAccepted ? HTTP_STATUS_OK : HTTP_STATUS_FORBIDDEN
            );
        }
    }
}
