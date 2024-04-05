import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useToast } from '../../hooks/useToast'
import { Button, Toast } from '..'

type Props = {
  message: string | string[]
}

export default {
  title: 'Toast',
  component: Toast,
  argTypes: {},
} as ComponentMeta<typeof Toast>

const Template: ComponentStory<typeof Toast> = ({ message }: Props) => {
  const toast = useToast()

  return (
    <Button
      variant="primary"
      label="Open Toast"
      onClick={() => toast(message)}
    />
  )
}
export const Example = Template.bind({})
Example.args = {
  message:
    'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
}

export const Multiline = Template.bind({})
Multiline.args = {
  message: [
    '1行目1行目1行目1行目1行目1行目1行目1行目1行目1行目1行目1行目1行目1行目',
    '2行目2行目2行目2行目2行目2行目2行目2行目2行目2行目2行目2行目2行目2行目',
  ],
}
