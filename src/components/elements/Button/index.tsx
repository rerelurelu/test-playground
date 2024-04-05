import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from '@chakra-ui/react'

interface ButtonProps extends ChakraButtonProps {
  variant: 'primary' | 'secondary' | 'third' | 'negative'
  label: string
  onClick?: () => void
}

export const Button = forwardRef<ButtonProps, 'button'>(
  ({ label, ...props }, ref) => {
    return (
      <ChakraButton ref={ref} {...props}>
        {label}
      </ChakraButton>
    )
  },
)
