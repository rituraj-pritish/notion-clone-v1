import {
	Editor,
	EditorState,
	RichUtils,
	convertToRaw,
	convertFromRaw
} from 'draft-js'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

import {
	createBlock,
	CreateBlockInput,
	updateBlock,
	UpdateBlockInput
} from '@/api/endpoints'
import { COLORS, BACKGROUNDS } from '@/constants/colorsAndBackgrounds'
import queryClient from '@/core/queryClient'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import { Block as BlockType } from '@/types/block'
import { Page } from '@/types/page'

import TextOptions from '../TextOptions'
import BlockWrapper from './BlockWrapper'
import { getRawData, isContentSame } from './utils'

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

interface Props extends BlockType {
	page: Page
	newOrder: number
}

const Block = ({ newOrder, ...props }: Props) => {
	const { page, object, id, order } = props
	const router = useRouter()
	const pathPageId = router.query.pageId
	const isInsideModal = pathPageId !== page.id

	const editorRef = useRef(null)
	const editorWrapperRef = useRef<HTMLDivElement>(null)
	const [state, setState] = useState(() =>
		EditorState.createWithContent(convertFromRaw(getRawData(object)))
	)
	const { mutateAsync: updateBlockMutation } = useMutation<
		BlockType,
		unknown,
		UpdateBlockInput
	>((values) => updateBlock(values))
	const { mutateAsync: createBlockMutation } = useMutation<
		BlockType,
		unknown,
		CreateBlockInput
	>((values) => createBlock(values), {
		onSuccess: (data) => {
			queryClient.setQueryData<BlockType[]>([page.id, 'blocks'], (prevData) =>
				[...prevData!, data].sort((a, b) => a.order - b.order)
			)
		}
	})

	useEffect(() => {
		if (editorRef.current) editorRef.current.focus()
	}, [])

	const [modalPosition, setModalPosition] = useState({})

	const handleSelected = () => {
		const selection = state.getSelection()
		const offset = selection.getStartOffset()

		if (editorWrapperRef.current) {
			setModalPosition({
				top: editorWrapperRef.current.offsetTop - 20 - 10 + 'px',
				left: isInsideModal
					? editorWrapperRef.current.offsetLeft + offset * 6.5 + 'px'
					: (window.innerWidth - 970) / 2 +
					  editorWrapperRef.current.offsetLeft +
					  offset * 6.5 +
					  'px'
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
			const rawContent = convertToRaw(state.getCurrentContent()).blocks[0]
			if (isContentSame(object, rawContent)) return
			updateBlockMutation({
				id,
				order,
				object: {
					styles: rawContent.inlineStyleRanges,
					text: rawContent.text
				}
			})
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

	return (
		<>
			<TextOptions
				isSelected={isSelected}
				modalStyles={modalStyles}
				onSelect={(name) => {
					setState((prevState) => {
						const editorState = RichUtils.toggleInlineStyle(prevState, name)
						const selectionState = prevState.getSelection()
						return EditorState.forceSelection(editorState, selectionState)
					})
				}}
				activeOptions={getActiveOptions() || []}
			/>
			<BlockWrapper {...props}>
				<div ref={editorWrapperRef} style={{ width: '100%' }}>
					<Editor
						customStyleMap={styleMap}
						editorState={state}
						onChange={setState}
						ref={editorRef}
						handleReturn={() => {
							createBlockMutation({
								parent: {
									type: 'PAGE',
									id: page.id
								},
								type: 'TEXT',
								order: newOrder,
								object: {
									styles: [],
									text: ''
								}
							})
							return 'handled'
						}}
						// todo use this to handle '/' input
						// handleBeforeInput={(char) => console.log('char', char)}
					/>
				</div>
			</BlockWrapper>
		</>
	)
}

export default Block
