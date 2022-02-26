import React, { useEffect, useRef, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { Modal } from '@/atoms'

const INPUT_HEIGHT = 20
const TEXT_WIDTH = 6.5

const contentEditableStyle = {
	border: '1px red solid',
	width: '100%',
	maxWidth: '1000px',
	height: '25px',
	display: 'flex',
	alignItems: 'center'
}

const Block = () => {
	const html = useRef('<b>abcd jklj asdf</b>')

	const [isVisible, setIsVisible] = useState(false)
	const [isOptionsVisible, setIsOptionsVisible] = useState(false)
	const [modalPosition, setModalPosition] = useState({})

	const inputRef = useRef<HTMLInputElement>(null)

	const getCaretPosition = () => window.getSelection()?.focusOffset || 0

	const handleChange = (e: ContentEditableEvent) => {
		const value = e.target.value
		html.current = value
	}

	const handleKeyUp = () => {
		// remove html tags
		const string = html.current.replace(/(<([^>]+)>)/gi, '')

		if (string[getCaretPosition() - 1] === '/') {
			setIsVisible(true)
			inputRef.current?.focus()
			if (inputRef.current) {
				setModalPosition({
					top: inputRef.current.offsetTop + INPUT_HEIGHT + 'px',
					left:
						inputRef.current.offsetLeft + getCaretPosition() * TEXT_WIDTH + 'px'
				})
			}
		} else {
			setIsVisible(false)
		}
	}

	const modalStyles = React.useMemo(
		() => ({
			width: 'fit-content',
			height: 'fit-content',
			...modalPosition
		}),
		[modalPosition]
	)

	const handleSelection = () => {
		const range = window.getSelection()?.getRangeAt(0)
		if (!range) return
		const isSelected = range.collapsed === false

		if (!isSelected) return setIsOptionsVisible(false)

		const start = range.startOffset
		const end = range.endOffset
		
		if (inputRef.current) {
			setModalPosition({
				top: inputRef.current.offsetTop - INPUT_HEIGHT - 10 + 'px',
				left: inputRef.current.offsetLeft + start * TEXT_WIDTH + 'px'
			})
		}

		setIsOptionsVisible(true)
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	return (
		<>
			<ContentEditable
				innerRef={inputRef}
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				html={html.current}
				onMouseDown={() => getCaretPosition()}
				onMouseUp={() => {
					console.log('Up', getCaretPosition())
					handleSelection()
				}}
				style={contentEditableStyle}
			/>

			<Modal visible={isVisible} styles={modalStyles} showOverlay={false}>
				<Modal.ModalContent>
					<>options</>
				</Modal.ModalContent>
			</Modal>

			<Modal
				visible={isOptionsVisible}
				styles={modalStyles}
				showOverlay={false}
				onRequestClose={() => setIsOptionsVisible(false)}
			>
				<Modal.ModalContent>
					<>text options</>
				</Modal.ModalContent>
			</Modal>
		</>
	)
}

export default Block
