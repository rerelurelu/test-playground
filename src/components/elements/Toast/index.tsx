import { Flex, Text } from '@chakra-ui/react'

type Props = {
  message: string | string[]
}

export const Toast = ({ message }: Props) => {
  return (
    <Flex
      flexFlow="column"
      bg="rgba(68, 68, 68, 0.8)"
      justifyContent="center"
      alignItems="center"
      color="white"
      fontWeight="bold"
      fontSize="20px"
    >
      {typeof message === 'string' ? (
        <Text my="35px">{message}</Text>
      ) : (
        message.map((msg, idx) => (
          <Text
            key={idx}
            _first={{ mt: message.length === 1 ? '35px' : '20px' }}
            _last={{ mb: message.length === 1 ? '35px' : '20px' }}
          >
            {msg}
          </Text>
        ))
      )}
    </Flex>
  )
}
