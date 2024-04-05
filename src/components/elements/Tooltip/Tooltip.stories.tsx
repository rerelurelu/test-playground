import { QuestionIcon, WarningIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Tooltip } from './'

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {},
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return <Tooltip {...args}>{args.children}</Tooltip>
}

export const Help = Template.bind({})
Help.args = {
  label: <Text fontSize={14}>sample label</Text>,
  children: <QuestionIcon boxSize={4} color="#235BC8" />,
}

export const Attention = Template.bind({})
Attention.args = {
  label: <Text fontSize={14}>sample label</Text>,
  children: (
    <WarningIcon
      backgroundColor="#333"
      borderRadius={50}
      color="#FFD500"
      boxSize={4}
    />
  ),
}

export const Lable = Template.bind({})
Lable.args = {
  label: <Text fontSize={14}>sample label</Text>,
  children: <Text w={70}>Sample</Text>,
}
