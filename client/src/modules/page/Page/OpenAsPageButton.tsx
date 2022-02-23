import { useRouter } from 'next/router'
import React from 'react'
import { CgExpand } from 'react-icons/cg'

import { Button } from '@/atoms'
import { Page } from '@/types/page'

const OpenAsPageButton = (props: Page) => {
	const router = useRouter()
	const { pageId } = router.query

	const isOnSameRoute = pageId === props.id

	if (isOnSameRoute) return null

	return (
		<Button
			variant='secondary'
			size='small'
			ghost
			leftIcon={CgExpand}
			tooltip='Navigate to this page'
			onClick={() => router.push(`/${props.id}`)}
		>
			Open as Page
		</Button>
	)
}

export default OpenAsPageButton
