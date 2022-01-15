import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import api from  '@/api';
import { Layout } from  '@/components';
import { GET_PAGE } from  '@/graphql/pages/queries';
import { Page as PageType } from 'types/page';

const Page = ({
	icon,
	name
}: PageType) => {
	return (
		<div>
			<Head>
				<link 
					rel="icon"
					href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`}
				/>
				<title>{name}</title>
			</Head>
			<Layout>
				
			</Layout>
		</div>
	);
};

export default Page;

export async function getServerSideProps (ctx: GetServerSidePropsContext) {
	const pageId = ctx.params.pageId;
	const page = await api(GET_PAGE, { id: pageId });

	return {
		props: page
	};
}
