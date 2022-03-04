import React from 'react'

import useModal from '@/atoms/Modal/useModal'
import {
	COLORS as ALL_COLORS,
	BACKGROUNDS as ALL_BACKGROUNDS
} from '@/constants/colorsAndBackgrounds'
import { capitalize } from '@/helpers/stringHelpers'

import {
	Heading,
	OptionIcon,
	PickerOption,
	RootWrapper
} from './TextColorPicker.styles'

const COLORS = Object.entries(ALL_COLORS).map(([key, value]) => ({
	name: capitalize(key),
	color: value
}))

const BACKGROUNDS = Object.entries(ALL_BACKGROUNDS).map(([key, value]) => ({
	name: capitalize(key),
	color: value
}))

interface Props {
	onClick: (value: string) => void
}

const TextColorPicker = ({ onClick }: Props) => {
	const { closeModal } = useModal()

	const handleClick = (value: string) => {
		onClick(value)
		closeModal()
	}

	return (
		<RootWrapper>
			<Heading>COLOR</Heading>
			{COLORS.map(({ name, color }) => (
				<PickerOption
					key={name}
					onClick={() => handleClick(`color_${name.toLowerCase()}`)}
				>
					<OptionIcon color={color}>A</OptionIcon>
					<div>{name}</div>
				</PickerOption>
			))}
			<Heading>BACKGROUND</Heading>
			{BACKGROUNDS.map(({ name, color }) => (
				<PickerOption
					key={name}
					onClick={() => handleClick(`bg_${name.toLowerCase()}`)}
				>
					<OptionIcon background={name === 'Default' ? undefined : color}>
						A
					</OptionIcon>
					<div>{name} background</div>
				</PickerOption>
			))}
		</RootWrapper>
	)
}

export default TextColorPicker
