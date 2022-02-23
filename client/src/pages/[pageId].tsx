import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'

import { getPage } from '@/api/endpoints'
import { Box, Flex } from '@/atoms'
import { Sidebar, SidebarCollapseButton } from '@/components'
import Breadcrumbs from '@/modules/page/Breadcrumbs'
import PageComponent from '@/modules/page/Page'
import PageOptions from '@/modules/page/Page/PageOptions'
import { Ancestry, Page as PageType } from '@/types/page'

interface Props extends PageType {
	ancestry: Ancestry[]
}

const Page = (props: Props) => {
	const { icon, properties } = props
	const { title } = properties
	
	return (
		<div>
			<Head>
				<link
					rel='icon'
					href={
						icon && 'emoji' in icon
							? `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon.emoji}</text></svg>`
							: '/favicon.ico'
					}
				/>
				<title>{title}</title>
			</Head>
			<Flex>
				<Sidebar />
				<Flex flexGrow={1} flexDirection='column'>
					<Flex py={1} paddingRight={2}>
						<SidebarCollapseButton />
						<Breadcrumbs {...props} />
						<Flex flexGrow={1} />
						<PageOptions />
					</Flex>
					<Box marginX='auto'>
						<PageComponent {...props} />
					</Box>
				</Flex>
			</Flex>
		</div>
	)
}

export default Page

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const token = ctx.req.cookies.auth_token
	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: true
			}
		}
	}

	const pageId = ctx.params?.pageId

	let page
	if (typeof pageId === 'string') {
		page = await getPage(pageId, token)
	}

	return {
		props: page ? page : {}
	}
}
