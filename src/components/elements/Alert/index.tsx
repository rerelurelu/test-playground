import { ServerMessage } from '@/types/ErrorMessage'
import {
  Flex,
  FlexProps,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'


type Props = FlexProps & {
  heading?: string
  message?: ServerMessage[]
  component?: ReactNode
}

export const Alert = ({ heading, message, component, ...props }: Props) => {
  return (
    <Flex
      color="red"
      fontWeight="bold"
      flexFlow="column"
      border="1px"
      borderRadius="md"
      borderColor="red"
      p={2}
      {...props}
    >
      {heading && <Text>{heading}</Text>}
      <UnorderedList>
        {component && <ListItem>{component}</ListItem>}
        {message?.map((item, idx) => (
          <ListItem key={idx}>{item.message}</ListItem>
        ))}
      </UnorderedList>
    </Flex>
  )
}
