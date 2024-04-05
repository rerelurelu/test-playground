import { Text } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { StatusMessage } from './'

export default {
  title: 'StatusMessage',
  component: StatusMessage,
  argTypes: {},
} as ComponentMeta<typeof StatusMessage>

const Template: ComponentStory<typeof StatusMessage> = (args) => {
  return (
    <StatusMessage {...args}>
      <Text>Sample</Text>
    </StatusMessage>
  )
}

export const Default = Template.bind({})
Default.args = {}
