import React, { memo } from 'react'

import { InlineSvgIcon } from '@goldeimer/react-components'

import wholesaleSvg
    from '@goldeimer/img-asset-lib/icon/merchant-type/wholesale.icon.svg'

const WholesaleIcon = (props) => <InlineSvgIcon svg={wholesaleSvg} {...props} />

export default memo(WholesaleIcon)
