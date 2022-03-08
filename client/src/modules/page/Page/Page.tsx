import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

import { updatePage } from '@/api/endpoints'
import { Box } from '@/atoms'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import Blocks from '@/modules/block/Blocks'
import { Page as PageType } from '@/types/page'

import { StyledInput } from './Page.styles'
import PageHeader from './PageHeader'

const Page = (props: PageType) => {
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)
	const [title, setTitle] = useState(props.properties.title)

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
				// refresh server side props
				router.replace(router.asPath)
				onPageUpdate(props.id, props.hierarchy, { properties })
			}
		}
	)

	useEffect(() => {
		setTitle(props.properties.title)
	}, [props.properties.title])

	useEffect(() => {
		if (inputRef.current && props.properties.title === 'Untitled') {
			inputRef.current.focus()
		}
	}, [props.id, props.properties.title])

	return (
		<div>
			<PageHeader {...props} />
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
					value={title === 'Untitled' ? '' : title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={() => {
						if (title === props.properties.title) return
						mutateAsync(title)
					}}
				/>
				<Blocks page={props} />
			</Box>
		</div>
	)
}

export default Page
