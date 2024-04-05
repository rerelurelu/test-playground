import { Flex, FlexProps, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'

import { DirectDebitResponse } from '@/common/types'

type Props = FlexProps & {
  directDebit: DirectDebitResponse
}

export const FinalizedInfo: FC<Props> = ({ directDebit, ...props }) => {
  const { createdAt, createdBy } = directDebit
  return (
    <Flex
      bg="#F6F8F9"
      w="338px"
      color="#333333"
      px="10px"
      py="7px"
      gap="10px"
      alignItems="center"
      justifyContent="start"
      fontSize="sm"
      {...props}
    >
      <Text whiteSpace="nowrap">確定日時</Text>
      <Text whiteSpace="nowrap" isTruncated>
        {`${dayjs(createdAt).format('M/D HH:mm')} ${createdBy ?? ''}`}
      </Text>
    </Flex>
  )
}
