import { IconProps, QuestionIcon } from '@chakra-ui/icons'
import { FC } from 'react'

type Props = IconProps & {
  link: string
  size: string
  ml?: string
  mb?: string
}

export const QuestionLink: FC<Props> = ({ link, size, ml, mb, ...props }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    style={{
      width: '20px',
      height: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: ml,
      marginBottom: mb,
    }}
  >
    <QuestionIcon width={size} height={size} color="icon.question" {...props} />
  </a>
)
