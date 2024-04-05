import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Input } from './'

export default {
  title: 'Input',
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Normal = Template.bind({})
Normal.args = {
  placeholder: 'Example',
}
