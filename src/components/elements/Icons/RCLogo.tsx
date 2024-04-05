import Image from 'next/image'
import { FC } from 'react'

import imagePath from '../../../../public/logo_cloud.png'

type Props = {
  width: number
  height: number
}

// RCはRehab Cloudの略
export const RCLogo: FC<Props> = ({ width, height }) => (
  <Image src={imagePath} width={width} height={height} alt="Rehab Cloud Logo" />
)
