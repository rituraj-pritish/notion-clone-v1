import React from 'react'

import { Modal } from '@/atoms'

import TextOptions, { Props as TextOptionsProps } from './TextOptions'

interface Props extends TextOptionsProps {
	isSelected: boolean
	modalStyles: object
}

const TextOptionsWrapper = ({ isSelected, modalStyles, ...rest }: Props) => {
	return (
		<Modal
			visible={isSelected}
			styles={modalStyles}
			showOverlay={false}
			shouldFocusAfterRender={false}
		>
			<Modal.ModalContent>
				<TextOptions {...rest} />
			</Modal.ModalContent>
		</Modal>
	)
}

export default TextOptionsWrapper
