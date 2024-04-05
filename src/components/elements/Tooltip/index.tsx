import {
  Box,
  PlacementWithLogical,
  StyleProps,
  Tooltip as ChakraTooltip,
} from '@chakra-ui/react'
import React, { FC, ReactElement, ReactNode } from 'react'

type Props = {
  label: ReactElement
  labelWidth?: StyleProps['width']
  children?: ReactNode
  placement?: PlacementWithLogical
  isDisabled?: boolean
  isClickToggle?: boolean // Tooltipをクリックで開閉するかどうか
}

export const Tooltip: FC<Props> = ({
  label,
  labelWidth,
  children,
  placement,
  isDisabled = false,
}) => {
  return (
    <ChakraTooltip
      {...{
        placement,
        isDisabled,
        hasArrow: true,
        bg: '#737373',
        borderRadius: 7,
        maxWidth: '1440px',
      }}
      label={
        <Box p="5px" w={labelWidth}>
          {label}
        </Box>
      }
    >
      {children}
    </ChakraTooltip>
  )
}
