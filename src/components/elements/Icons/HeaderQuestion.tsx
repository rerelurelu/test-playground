import Image from 'next/image'
import React from 'react'

import Question from '../../../../public/question.png'

export const HeaderQuestion = () => (
  <Image src={Question} width={12} height={18} alt="logo" />
)
