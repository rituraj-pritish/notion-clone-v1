import React from 'react'
import { useQuery } from 'react-query'

import { getBlocks } from '@/api/endpoints'
import { Page } from '@/types/page'

import Block from '../Block/Block'

interface Props {
	page: Page
}

const Blocks = ({ page }: Props) => {
	const { data } = useQuery([page.id, 'blocks'], () => getBlocks(page.id))

	return (
		<div>
			{data?.map((block) => (
				<Block {...block} page={page} key={block.id} />
			))}
			<Block page={page} index={data ? data.length + 1 : undefined} />
		</div>
	)
}

export default Blocks
