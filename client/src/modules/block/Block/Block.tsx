import Draft, { RawDraftContentState } from 'draft-js'
import React, { useEffect, useRef, useState } from 'react'

import { Modal } from '@/atoms'

import TextOptions from '../TextOptions'

const txt: RawDraftContentState = {
	blocks: [
		{
			key: 'foo',
			text: 'asdfasdfasdfsdf asd fasdf asdf asdf asdf asdf asdf asdf',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [
				{
					offset: 0,
					length: 15,
					style: 'BOLD'
				},
				{
					offset: 26,
					length: 4,
					style: 'BOLD'
				},
				{
					offset: 42,
					length: 1,
					style: 'BOLD'
				},
				{
					offset: 0,
					length: 15,
					style: 'ITALIC'
				},
				{
					offset: 36,
					length: 4,
					style: 'ITALIC'
				}
			],
			entityRanges: [],
			data: {}
		}
	],
	entityMap: {}
}

const emptyContentState = Draft.convertFromRaw(txt)

const Block = () => {
	const { Editor, EditorState, RichUtils, convertToRaw } = Draft
	const editorRef = useRef<HTMLDivElement>(null)

	const [state, setState] = useState(() =>
		EditorState.createWithContent(emptyContentState)
	)
	const [modalPosition, setModalPosition] = useState({})

	const handleSelected = () => {
		const selection = state.getSelection()
		const offset = selection.getStartOffset()

		if (editorRef.current) {
			setModalPosition({
				top: editorRef.current.offsetTop - 20 - 10 + 'px',
				left: editorRef.current.offsetLeft + offset * 6.5 + 'px'
			})
		}
	}

	const getActiveOptions = () => {
		const selection = state.getSelection()
		const offset = selection.getStartOffset()
		const length = selection.getEndOffset() - offset

		const content = convertToRaw(state.getCurrentContent()).blocks[0]

		return content.inlineStyleRanges
			.filter((range) => range.offset === offset && range.length === length)
			.map((range) => range.style)
	}

	const isSelected = !state.getSelection().isCollapsed()

	useEffect(() => {
		if (isSelected) handleSelected()
		// eslint-disable-next-line
	}, [state.getSelection()])

	const modalStyles = React.useMemo(
		() => ({
			width: 'fit-content',
			height: 'fit-content',
			...modalPosition
		}),
		[modalPosition]
	)

	return (
		<>
			{/* <TextOptions
				onSelect={(name) => {
					setState((prevState) => {
						const editorState = RichUtils.toggleInlineStyle(prevState, name)
						const selectionState = prevState.getSelection()
						return EditorState.forceSelection(editorState, selectionState)
					})
				}}
				activeOptions={getActiveOptions() || []}
			/> */}
			<Modal
				visible={isSelected}
				styles={modalStyles}
				showOverlay={false}
				shouldFocusAfterRender={false}
			>
				<Modal.ModalContent>
					<TextOptions
						onSelect={(name) => {
							setState((prevState) => {
								const editorState = RichUtils.toggleInlineStyle(prevState, name)
								const selectionState = prevState.getSelection()
								return EditorState.forceSelection(editorState, selectionState)
							})
						}}
						activeOptions={getActiveOptions() || []}
					/>
				</Modal.ModalContent>
			</Modal>
			<div ref={editorRef}>
				<Editor editorState={state} onChange={setState} />
			</div>
		</>
	)
}

export default Block
