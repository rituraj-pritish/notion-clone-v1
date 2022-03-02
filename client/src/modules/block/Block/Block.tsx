import React, { useEffect, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'

import { Modal } from '@/atoms'
import getNewUuid from '@/helpers/getNewUuid'

import TextOptions from '../TextOptions'
import {
	getSelectedNodes,
	htmlToRichTextPayload,
	richTextPayloadToHtml
} from './utils'

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

const richText = [
	{
		id: 1,
		text: 'a',
		annotations: {}
	},
	{
		id: 2,
		text: 'b',
		annotations: {
			bold: true,
			italic: true
		}
	},
	{
		id: 3,
		text: 'c',
		annotations: {
			// bold: true
		}
	},
	{
		id: 4,
		text: ' ',
		annotations: {
			// bold: true
		}
	},
	{
		id: 5,
		text: 'd',
		annotations: {
			// bold: true
		}
	}
]
const Block = () => {
	const html = useRef(richTextPayloadToHtml(richText))

	const [isMetaKeyPressed, setIsMetaKeyPressed] = useState(false)
	const [render, setRender] = useState(true)
	const [selectedIds, setSelectedIds] = useState([])
	const [isVisible, setIsVisible] = useState(false)
	const [isOptionsVisible, setIsOptionsVisible] = useState(false)
	const [modalPosition, setModalPosition] = useState({})

	const rerender = () => setRender(!render)

	const inputRef = useRef<HTMLInputElement>(null)

	const getCaretPosition = () => window.getSelection()?.focusOffset || 0

	const handleKeyUp = (e) => {
		if (isMetaKeyPressed) return
		if (e.metaKey) {
			setIsMetaKeyPressed(false)
			return
		}
		
		const input = e.key

		if (input === '/') {
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
			const newRichText = htmlToRichTextPayload(html.current).concat({
				id: getNewUuid(),
				text: input,
				annotations: {}
			})
			html.current = richTextPayloadToHtml(newRichText)
			rerender()
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
		const selection = window.getSelection()
		if (selection?.isCollapsed) return

		const selectedNodeIds = getSelectedNodes().map((node) => node.id)
		setSelectedIds(selectedNodeIds)

		if (inputRef.current) {
			setModalPosition({
				top: inputRef.current.offsetTop - INPUT_HEIGHT - 10 + 'px',
				left: inputRef.current.offsetLeft + 'px'
			})
		}
		setIsOptionsVisible(true)
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	const handleKeyDown = (e) => {
		setIsMetaKeyPressed(e.metaKey)
	}

	return (
		<>
			<ContentEditable
				innerRef={inputRef}
				onKeyUp={handleKeyUp}
				onKeyDown={handleKeyDown}
				html={html.current}
				onMouseDown={() => getCaretPosition()}
				onMouseUp={() => {
					console.log('Up', getCaretPosition())
					handleSelection()
				}}
				style={contentEditableStyle}
			/>

			<Modal
				visible={isVisible}
				styles={modalStyles}
				showOverlay={false}
				onRequestClose={() => setIsVisible(false)}
			>
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
					<TextOptions
						onSelect={(type, value) => {
							const newRichText = htmlToRichTextPayload(html.current).map(
								(obj) => {
									if (selectedIds.includes(obj.id.toString())) {
										return {
											...obj,
											annotations: {
												...obj.annotations,
												[type]: value
											}
										}
									}
									return obj
								}
							)
							html.current = richTextPayloadToHtml(newRichText)
							setIsOptionsVisible(false)
						}}
					/>
				</Modal.ModalContent>
			</Modal>
		</>
	)
}

export default Block
