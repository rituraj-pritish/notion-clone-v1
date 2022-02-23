import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

import { updatePage } from '@/api/endpoints'
import { Flex, Input, Space } from '@/atoms'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import useKeyPress from '@/hooks/useKeyPress'
import ChangeIcon from '@/shared/ChangeIcon'
import { Ancestry, Page } from '@/types/page'

interface Props extends Page {
	onEnter: VoidFunction
}

const RenamePage = (props: Props | Ancestry) => {
	const { id } = props
	const router = useRouter()
	const title = 'title' in props ? props.title : props.properties.title

	const [text, setText] = useState<string>(title)

	const enterPress = useKeyPress('Enter')
	const { mutateAsync } = useMutation(updatePage, {
		onSuccess: () => {
			// refresh server side props
			router.replace(router.asPath)
			onPageUpdate(id, props.hierarchy, { properties: { title: text } })
		}
	})
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		if (enterPress) {
			if ('onEnter' in props && typeof props.onEnter === 'function')
				props.onEnter()

			if (text !== title) {
				mutateAsync({
					id,
					properties: {
						title: text
					}
				})
			}
		}
		// eslint-disable-next-line
	}, [enterPress])

	return (
		<Flex p={1}>
			<Space size={4}>
				<ChangeIcon iconSize='medium' bordered {...props} />
				<Flex width={300}>
					<Input
						fullWidth
						size='small'
						type='secondary'
						placeholder={title}
						onChange={(e) => setText(e.target.value)}
						ref={inputRef}
					/>
				</Flex>
			</Space>
		</Flex>
	)
}

export default RenamePage
