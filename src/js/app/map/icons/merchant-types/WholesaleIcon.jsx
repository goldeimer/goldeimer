import React, { memo } from 'react'

import InlineSvgIcon from '@lib/components/InlineSvgIcon'

import wholesaleSvg from 'img/icons/merchant-types/wholesale.icon'

const WholesaleIcon = (props) => <InlineSvgIcon svg={wholesaleSvg} {...props} />

export default memo(WholesaleIcon)
