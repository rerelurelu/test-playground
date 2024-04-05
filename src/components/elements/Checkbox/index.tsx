import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
  forwardRef,
  StyleProps,
  Text,
} from '@chakra-ui/react'

interface CheckboxProps extends ChakraCheckboxProps {
  label?: string
  fontSize?: StyleProps['fontSize']
}

export const Checkbox = forwardRef<CheckboxProps, 'input'>(
  ({ fontSize, label, ...props }, ref) => {
    return (
      <ChakraCheckbox ref={ref} my={2} mr={2} {...props}>
        {label && <Text fontSize={fontSize}>{label}</Text>}
      </ChakraCheckbox>
    )
  },
)
