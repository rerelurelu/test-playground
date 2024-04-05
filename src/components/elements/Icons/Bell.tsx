import Image from 'next/image'
import React from 'react'

import BellIcon from '../../../../public/bell.png'

export const Bell = () => (
  <Image src={BellIcon} width={24} height={24} alt="logo" />
)
