<?php

namespace Goldeimer
{
    requireOnce('campaign/campaign.register-post-type');

    add_action(
        'init',
        registerPostType()
    );
}
