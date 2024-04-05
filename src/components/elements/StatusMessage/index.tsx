import { Alert, AlertIcon } from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
  children?: React.ReactElement
}
export const StatusMessage: FC<Props> = ({ ...props }) => {
  return (
    <Alert
      status="info"
      border="solid 1px #06BCD4"
      borderRadius="md"
      bg="#e0f7fa"
      p="5px"
      fontSize={14}
    >
      <AlertIcon color="#06BCD4" ml="5px" />
      {props.children}
    </Alert>
  )
}
