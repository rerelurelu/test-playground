import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  size?: number
}

export const UnreadMark: FC<Props> = ({ size = 10 }) => {
  return (
    <Flex>
      <Box
        w={`${size}px`}
        h={`${size}px`}
        borderRadius="50%"
        backgroundColor="#E85009"
      />
    </Flex>
  )
}
