import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const helpers = createMultiStyleConfigHelpers(inputAnatomy.keys)

export const Input = helpers.defineMultiStyleConfig({
  sizes: {
    md: {
      field: { h: '38px' },
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: 'input.border',
        _focusVisible: {
          boxShadow: 'none',
        },
        _invalid: {
          bg: 'input.error.bg',
          borderColor: 'input.error.border',
          boxShadow: 'none',
        },
      },
      element: {
        w: '36px',
        bg: 'input.icon.bg',
        height: '100%',
        border: '1px',
        borderColor: 'input.border',
        borderBottomEndRadius: 'md',
        borderTopRightRadius: 'md',
      },
    },
    prominent: {
      field: {
        border: '1px',
        _disabled: {
          bg: '#EDEDED',
          opacity: 1,
          borderColor: '#848484',
        },
        _invalid: {
          bg: 'input.error.bg',
          borderColor: 'input.error.border',
          boxShadow: 'none',
        },
      },
    },
  },
  baseStyle: {
    field: {
      _placeholder: {
        color: 'placeholder',
      },
    },
  },
})
