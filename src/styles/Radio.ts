import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const helpers = createMultiStyleConfigHelpers(radioAnatomy.keys)

export const Radio = helpers.defineMultiStyleConfig({
  baseStyle: {
    label: {
      marginLeft: '3px',
    },
    control: {
      borderColor: '#989494',
      bg: 'white',
      border: '1px solid',
      _checked: {
        borderColor: '#989494',
        background: 'white',
        _before: {
          width: 'calc(100% - 2px)',
          height: 'calc(100% - 2px)',
          background: '#06BCD4',
        },
        _hover: {
          borderColor: '#989494',
          background: 'white',
        },
        _focus: {
          boxShadow: 'none',
        },
      },
      _disabled: {
        bg: '#EFEFEF',
        borderColor: '#989494',
        _checked: {
          opacity: '0.8',
        },
      },
    },
  },
})
