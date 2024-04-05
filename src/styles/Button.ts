import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  sizes: {
    form: { fontSize: '16px', lineHeight: '16px', p: '9px' },
    sm: {
      h: '100%',
      px: '9px',
      py: '5px',
      fontSize: '12px',
      lineHeight: '12px',
    },
    md: {
      fontSize: '16px',
      lineHeight: '16px',
      minWidth: '130px',
      px: '9px',
    },
  },
  variants: {
    primary: {
      bg: '#E7680A',
      border: '1px solid #BC5C00',
      textColor: 'white',
      _focus: {
        boxShadow: 'none',
        bg: '#BC5C00',
      },
      _hover: {
        boxShadow: 'none',
        bg: '#BC5C00',
        _disabled: {
          bg: '#E7680A',
        },
      },
    },
    secondary: {
      bg: 'white',
      border: '1px solid #E7680A',
      boxShadow: '0px 1px 0px #E7680A',
      textColor: '#E7680A',
      _disabled: {
        border: '1px solid #E7680A',
        boxShadow: '0px 1px 0px #E7680A',
        textColor: '#E7680A',
      },
      _focus: {
        textColor: '#BC5C00',
        border: '1px solid #BC5C00',
        boxShadow: '0px 1px 0px #BC5C00',
      },
      _hover: {
        textColor: '#BC5C00',
        border: '1px solid #BC5C00',
        boxShadow: '0px 1px 0px #BC5C00',
        _disabled: {
          border: '1px solid #E7680A',
          boxShadow: '0px 1px 0px #E7680A',
          textColor: '#E7680A',
        },
      },
      _active: {
        border: '1px solid #BC5C00',
        textColor: '#BC5C00',
        boxShadow: 'none',
      },
    },
    third: {
      bg: 'white',
      border: '1px solid #989494',
      boxShadow: '0px 1px 0px #989494',
      textColor: '#989494',
      _disabled: {
        textColor: '#989494',
        border: '1px solid #989494',
        boxShadow: '0px 1px 0px #989494',
      },
      _focus: {
        border: '1px solid #333333',
        boxShadow: '0px 1px 0px #333333',
        textColor: '#333333',
      },
      _hover: {
        border: '1px solid #333333',
        boxShadow: '0px 1px 0px #333333',
        textColor: '#333333',
        _disabled: {
          textColor: '#989494',
          border: '1px solid #989494',
          boxShadow: '0px 1px 0px #989494',
        },
      },
      _active: {
        border: '1px solid #333333',
        boxShadow: 'none',
        textColor: '#333333',
      },
    },
    negative: {
      textColor: '#DE3624',
      bg: 'white',
      border: '1px solid #BC2717',
      boxShadow: '0px 1px 0px #BC2717',
      _disabled: {
        textColor: '#DE3624',
        bg: 'white',
        border: '1px solid #BC2717',
        boxShadow: '0px 1px 0px #BC2717',
      },
      _hover: {
        textColor: '#BC2717',
        border: '1px solid #790D02',
        boxShadow: '0px 1px 0px #790D02',
        _disabled: {
          textColor: '#DE3624',
          bg: 'white',
          border: '1px solid #BC2717',
          boxShadow: '0px 1px 0px #BC2717',
        },
      },
      _active: {
        border: '1px solid #790D02',
        boxShadow: 'none',
        textColor: '#BC2717',
      },
    },
  },
})
