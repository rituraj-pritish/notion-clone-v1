import { useRouter } from 'next/router'
import React from 'react'

import { Button, Flex, Space } from '@/atoms'
import { Ancestry, Page } from '@/types/page'

import CurrentPageBreadcrumb from './CurrentPageBreadcrumb'

interface Props extends Page {
	ancestry: Ancestry[]
}

const Breadcrumbs = (props: Props) => {
	const router = useRouter()
	const { ancestry } = props

	return (
		<Flex alignItems='center'>
			{ancestry.map((item: Ancestry, idx: number) => {
				if (idx === ancestry.length - 1) {
					return <CurrentPageBreadcrumb {...item} />
				}

				if(idx === 1 && ancestry.length > 3) {
					return <><span>...</span><Space/><span>/</span></>
				}

				if(ancestry.length - idx > 2 && idx !== 0) return null

				return (
					<>
						<Space/>
						<Button
							key={item.id}
							variant='secondary'
							size='small'
							ghost
							onClick={() => router.push(`/${item.id}`)}
							leftIcon={
								item.icon && 'emoji' in item.icon ? item.icon.emoji : undefined
							}
						>
							{item.title}
						</Button>
						<Space/>
						<span>/</span>
						<Space/>
					</>
				)
			})}
		</Flex>
	)
}

export default Breadcrumbs
