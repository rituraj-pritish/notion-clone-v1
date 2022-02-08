import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'

import { getPage } from '@/api/endpoints'
import { Layout } from '@/components'
import { Page as PageType } from '@/types/page'

const Page = ({ icon, properties }: PageType) => {
	const {title} = properties
	return (
		<div>
			<Head>
				<link
					rel='icon'
					href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`}
				/>
				<title>{title}</title>
			</Head>
			<Layout>Page</Layout>
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
