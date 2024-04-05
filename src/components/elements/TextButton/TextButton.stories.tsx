import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TextButton } from './'

export default {
  title: 'TextButton',
  component: TextButton,
  argTypes: {},
} as ComponentMeta<typeof TextButton>

const Template: ComponentStory<typeof TextButton> = (args) => {
  return <TextButton {...args} />
}

export const Button = Template.bind({})
Button.args = {
  label: 'Button',
}
