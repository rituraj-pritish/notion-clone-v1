import { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

import { updatePage } from '@/api/endpoints'
import { Box, Text } from '@/atoms'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import { Page } from '@/types/page'

import { StyledInput } from './NewPage.styles'
import NewPageHeader from './NewPageHeader'

const NewPage = (props: Page) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [title, setTitle] = useState('')

	const { mutateAsync } = useMutation(
		(newTitle: string) =>
			updatePage({
				id: props.id,
				properties: {
					title: newTitle
				}
			}),
		{
			onSuccess: ({ properties }) => {
				onPageUpdate(props.id, props.hierarchy, { properties })
			}
		}
	)

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	return (
		<div>
			<NewPageHeader {...props} />
			<Box px={140}>
				<StyledInput
					type='secondary'
					size='medium'
					ref={inputRef}
					placeholder='Untitled'
					style={{
						border: 'none',
						fontSize: '50px',
						fontWeight: 'bold'
					}}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={() => mutateAsync(title)}
				/>
				<Text size='medium'>
					Press Enter to continue with an empty page or select a template
				</Text>
			</Box>
		</div>
	)
}

export default NewPage
