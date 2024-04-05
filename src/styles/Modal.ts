import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const helpers = createMultiStyleConfigHelpers(modalAnatomy.keys)

export const Modal = helpers.defineMultiStyleConfig({
  sizes: {
    sm: {
      dialog: {
        maxW: '600px',
      },
    },
    md: {
      dialog: {
        maxW: '750px',
      },
    },
    lg: {
      dialog: {
        maxW: '1020px',
      },
    },
  },
  baseStyle: {
    dialog: {
      px: '20px',
    },
    header: {
      display: 'flex',
      flexFlow: 'column',
      p: 0,
      mt: '20px',
      fontSize: '20px',
    },
    body: {
      p: 0,
      mt: '20px',
    },
    footer: {
      my: '30px',
      p: 0,
      justifyItems: 'start',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
})
