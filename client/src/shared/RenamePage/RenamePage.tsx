import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'

import { updatePage } from '@/api/endpoints'
import { Flex, Input, Space } from '@/atoms'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import useKeyPress from '@/hooks/useKeyPress'
import ChangeIcon from '@/shared/ChangeIcon'
import { Page } from '@/types/page'

interface Props extends Page {
	onEnter: VoidFunction
}

const RenamePage = ({ onEnter, ...props }: Props) => {
	const { name, id, hierarchy } = props

	const [text, setText] = useState<string>(name)

	const enterPress = useKeyPress('Enter')
	const { mutateAsync } = useMutation(updatePage, {
		onSuccess: () => onPageUpdate(id, hierarchy, { name: text })
	})
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		if (enterPress) {
			onEnter()
			if (text !== name) {
				mutateAsync({
					id,
					name: text
				})
			}
		}
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
						placeholder={name}
						onChange={(e) => setText(e.target.value)}
						ref={inputRef}
					/>
				</Flex>
			</Space>
		</Flex>
	)
}

export default RenamePage
