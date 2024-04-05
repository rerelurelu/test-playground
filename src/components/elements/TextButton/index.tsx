import { Link, LinkProps } from '@chakra-ui/react'
import React, { FC } from 'react'

interface TextButtonProps extends LinkProps {
  label: string
  color?: string
  onClick?: () => void
  isDisabled?: boolean
  icon?: React.ReactElement
}
export const TextButton: FC<TextButtonProps> = ({
  color = '#989494',
  isDisabled = false,
  icon,
  label,
  onClick,
  ...props
}) => {
  return (
    <Link
      color={color}
      textDecoration="underline"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      textUnderlineOffset="3px"
      fontSize={14}
      opacity={isDisabled ? 0.7 : 1}
      onClick={() => {
        if (isDisabled || !onClick) return
        onClick()
      }}
      {...props}
    >
      {icon}
      {label}
    </Link>
  )
}
