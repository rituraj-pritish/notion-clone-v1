import {
	Editor,
	EditorState,
	RichUtils,
	convertToRaw,
	convertFromRaw
} from 'draft-js'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

import { createBlock } from '@/api/endpoints'
import { Modal } from '@/atoms'
import { COLORS, BACKGROUNDS } from '@/constants/colorsAndBackgrounds'
import getNewUuid from '@/helpers/getNewUuid'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import { Block as BlockType } from '@/types/block'
import { Page } from '@/types/page'

import TextOptions from '../TextOptions'

const empty = {
	blocks: [
		{
			text: '',
			key: 'foo',
			type: 'unstyled',
			entityRanges: []
		}
	],
	entityMap: {}
}

const colorsMap = Object.entries(COLORS).reduce(
	(acc, [key, value]) => ({
		...acc,
		[`color_${key}`]: {
			color: value
		}
	}),
	{}
)
const backgroundsMap = Object.entries(BACKGROUNDS).reduce(
	(acc, [key, value]) => ({
		...acc,
		[`bg_${key}`]: {
			background: value
		}
	}),
	{}
)

const styleMap = {
	...colorsMap,
	...backgroundsMap
}

const Block = ({ page }: { page: Page }) => {
	const editorRef = useRef<HTMLDivElement>(null)
	const [state, setState] = useState(() =>
		EditorState.createWithContent(convertFromRaw(empty))
	)
	const { mutateAsync } = useMutation<BlockType>((values) =>
		createBlock(values)
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

	useDebouncedEffect(
		() => {
			if (convertToRaw(state.getCurrentContent()).blocks[0].text) {
				mutateAsync({
					parent: {
						type: 'PAGE',
						id: page.id
					},
					index: 0,
					type: 'TEXT',
					object: convertToRaw(state.getCurrentContent())
				})
			}
		},
		[state.getCurrentContent()],
		500
	)

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
	// console.log('content', convertToRaw(state.getCurrentContent()))
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
				<Editor
					customStyleMap={styleMap}
					editorState={state}
					onChange={setState}
				/>
			</div>
		</>
	)
}

export default Block
