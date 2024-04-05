import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const helpers = createMultiStyleConfigHelpers(selectAnatomy.keys)

export const Select = helpers.defineMultiStyleConfig({
  sizes: {
    md: {
      field: { h: '38px', pb: 0 },
    },
  },
  variants: {
    outline: {
      field: {
        _invalid: {
          boxShadow: 'none',
          bg: 'select.error.bg',
        },
        _focusVisible: {
          zIndex: '0',
          boxShadow: 'none',
        },
        borderColor: 'input.border',
      },
      icon: {
        color: 'input.icon.color',
        bg: 'input.icon.bg',
        height: '100%',
        border: '1px',
        borderColor: 'input.border',
        right: '0',
        width: '36px',
        borderTopRightRadius: 'md',
        borderBottomRightRadius: 'md',
        fontSize: 'sm',
      },
    },
  },
})
