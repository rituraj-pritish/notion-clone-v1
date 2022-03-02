import React from 'react'
import { GoBold, GoItalic } from 'react-icons/go'

import { Flex } from '@/atoms'

import { Option } from './TextOptions.styles'

const TextOptions = ({ onSelect }) => {
	return (
		<Flex>
			<Option onClick={() => onSelect('bold', true)} isActive={false}>
				<GoBold size={18} />
			</Option>
			<Option onClick={() => onSelect('italic', true)} isActive={false}>
				<GoItalic size={18} />
			</Option>
		</Flex>
	)
}

export default TextOptions
