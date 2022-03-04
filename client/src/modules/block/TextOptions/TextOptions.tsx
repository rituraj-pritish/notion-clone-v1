import React from 'react'
import { GoBold, GoItalic } from 'react-icons/go'
import { RiUnderline } from 'react-icons/ri'
import { VscChevronDown } from 'react-icons/vsc'

import { Center, Flex, Modal } from '@/atoms'
import { BACKGROUNDS, COLORS } from '@/constants/colorsAndBackgrounds'

import TextColorPicker from '../TextColorPicker'
import { OptionIcon } from '../TextColorPicker/TextColorPicker.styles'
import { Option } from './TextOptions.styles'

interface Props {
	onSelect: (option: string) => void
	activeOptions: string[]
}

const ANNOTATIONS = [
	{ name: 'BOLD', icon: GoBold },
	{ name: 'ITALIC', icon: GoItalic },
	{ name: 'UNDERLINE', icon: RiUnderline }
]

const TextOptions = ({ onSelect, activeOptions }: Props) => {
	const getOptionIconProps = () => {
		const colorName = activeOptions.find((name) => name.includes('color_'))
		if (colorName) {
			const colorKey = colorName.replace('color_', '') as keyof typeof COLORS
			return { color: COLORS[colorKey] }
		}

		const bgName = activeOptions.find((name) => name.includes('bg_'))
		if (bgName) {
			const bgKey = bgName.replace('bg_', '') as keyof typeof BACKGROUNDS
			return { background: BACKGROUNDS[bgKey] }
		}
	}

	return (
		<Flex alignItems='center'>
			{ANNOTATIONS.map(({ name, icon: Icon }) => (
				<Option
					key={name}
					onClick={() => onSelect(name)}
					isActive={activeOptions.includes(name)}
				>
					<Icon size={18} />
				</Option>
			))}
			<Option>
				<Modal shouldFocusAfterRender>
					<Modal.ModalTrigger>
						<Center>
							<OptionIcon showBorder={false} {...getOptionIconProps()}>
								A
							</OptionIcon>
							<VscChevronDown />
						</Center>
					</Modal.ModalTrigger>
					<Modal.ModalPopover>
						<TextColorPicker onClick={(val) => onSelect(val)} />
					</Modal.ModalPopover>
				</Modal>
			</Option>
		</Flex>
	)
}

export default TextOptions
