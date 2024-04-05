import { extendTheme } from '@chakra-ui/react'

import { Button, Colors, Input, Modal, Radio, Select } from './styles'

const theme = extendTheme({
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: '14px',
        mb: '5px',
      },
    },
    Tabs: {
      baseStyle: {
        tablist: {
          borderBottom: '3px',
          borderStyle: 'solid',
          borderColor: '#06BCD4',
        },
        tab: {
          mr: 0.5,
          border: '1px',
          borderTopRadius: 'md',
          borderColor: '#06BCD4',
          background: '#06BCD4',
          textColor: 'white',
          _hover: {
            opacity: 0.6,
          },
          _selected: {
            background: 'white',
            color: '#06BCD4',
          },
        },
      },
    },
    Input,
    Button,
    Modal,
    Radio,
    Select,
    Checkbox: {
      baseStyle: {
        control: {
          bg: '#FFFFFF',
          border: '1px solid',
          borderColor: '#989494',
          borderRadius: '4px',
          _disabled: {
            borderRadius: '4px',
            border: '1px solid #989494',
            bg: '#EFEFEF',
            opacity: 0.4,
            _checked: {
              borderColor: '#989494',
              bg: '#06BCD4',
              color: 'white',
            },
          },
          _focus: {
            boxShadow: 'none',
          },
          _checked: {
            bg: '#06BCD4',
            borderColor: '#989494',
            _hover: {
              bg: '#06BCD4',
              borderColor: '#989494',
            },
          },
        },
        label: {
          marginInlineStart: '3px',
        },
      },
    },
  },
  colors: Colors,
  fonts: {
    body: `"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;`,
  },
  breakpoints: {
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
  },
})

export default theme
