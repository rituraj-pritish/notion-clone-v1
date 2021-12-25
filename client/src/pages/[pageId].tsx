import { Layout } from 'components';
import React, { useEffect } from 'react';

const Page = () => {
	return (
		<div>
			<Layout>
				
			</Layout>
		</div>
	);
};

export default Page;

export async function getServerSideProps (ctx) {
	return {
		props: {}
	};
}
