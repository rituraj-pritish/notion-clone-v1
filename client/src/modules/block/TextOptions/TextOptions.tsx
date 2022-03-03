import React from 'react'
import { GoBold, GoItalic } from 'react-icons/go'

import { Flex } from '@/atoms'

import { Option } from './TextOptions.styles'

interface Props {
	onSelect: (option: string) => void
	activeOptions: string[]
}

const ANNOTATIONS = [
	{ name: 'BOLD', icon: GoBold },
	{ name: 'ITALIC', icon: GoItalic }
]

const TextOptions = ({ onSelect, activeOptions }: Props) => {
	return (
		<Flex>
			{ANNOTATIONS.map(({ name, icon: Icon }) => (
				<Option
					key={name}
					onClick={() => onSelect(name)}
					isActive={activeOptions.includes(name)}
				>
					<Icon size={18} />
				</Option>
			))}
		</Flex>
	)
}

export default TextOptions
