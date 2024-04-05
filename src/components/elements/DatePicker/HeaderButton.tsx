import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { FC } from 'react'

export const HeaderButton: FC<IconButtonProps> = ({
  ...props
}: IconButtonProps) => {
  return (
    <IconButton
      bg="inherit"
      _hover={{}}
      _active={{}}
      _focus={{}}
      size="sm"
      w="100%"
      h="100%"
      {...props}
    />
  )
}
