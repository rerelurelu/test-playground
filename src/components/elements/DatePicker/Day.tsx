import { FlexProps, GridItem } from '@chakra-ui/react'
import { FC } from 'react'

interface DayProps extends FlexProps {
  day: number
  selected?: boolean
}

export const Day: FC<DayProps> = ({ ...props }) => {
  return (
    <GridItem
      {...props}
      w="40px"
      h="40px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="75%"
      bg={props.selected ? '#06bcd4' : 'white'}
      textColor={props.selected ? 'white' : '#333333'}
      userSelect="none"
      fontWeight="bold"
    >
      {props.day}
    </GridItem>
  )
}
