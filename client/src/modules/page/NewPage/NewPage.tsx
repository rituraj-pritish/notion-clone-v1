import { Box, Text } from '@/atoms'
import { useEffect, useRef } from 'react'
import { StyledInput } from './NewPage.styles'
import NewPageHeader from './NewPageHeader'

const NewPage = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	return (
		<div>
			<NewPageHeader/>
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
				/>
				<Text size='medium'>
					Press Enter to continue with an empty page or select a template
				</Text>
			</Box>
		</div>
	)
}

export default NewPage
