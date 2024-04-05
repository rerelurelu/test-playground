import { forwardRef, Input as ChakraInput, InputProps } from '@chakra-ui/react'

interface CustomInputProps extends InputProps {
  isSystemRequired?: boolean
}

export const Input = forwardRef<CustomInputProps, 'input'>(
  ({ isSystemRequired, bg, borderColor, ...props }, ref) => {
    return (
      <ChakraInput
        ref={ref}
        bg={isSystemRequired && !props.value ? 'input.required.bg' : bg}
        borderColor={
          isSystemRequired && !props.value
            ? 'input.required.border'
            : borderColor
        }
        {...props}
      />
    )
  },
)
