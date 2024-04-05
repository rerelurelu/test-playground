import { Flex, FlexProps } from '@chakra-ui/react'
import { FC } from 'react'

interface MonthProps extends FlexProps {
  month: number
  selected?: boolean
}

export const Month: FC<MonthProps> = ({ ...props }) => {
  return (
    <Flex
      {...props}
      w="44px"
      h="44px"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      bg={props.selected ? '#06bcd4' : 'white'}
      textColor={props.selected ? 'white' : '#333333'}
      userSelect="none"
      fontWeight="bold"
    >
      {props.month + 1}月
    </Flex>
  )
}
