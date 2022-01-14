import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import { NoAuthNavbar } from 'components';
import api from 'api';
import { GET_WORKSPACE } from 'graphql/workspaces';
import { Page } from 'types/page';

const Home: NextPage = () => {
	return (
		<div>
			<NoAuthNavbar/>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) =>{
	const token = ctx.req.cookies.auth_token;

	if(token) {
		const data = await api<{private: Page[], favorites: []}>(GET_WORKSPACE, {}, token);
		
		return {
			redirect: {
				destination: `${data.private[0].id}`,
				permanent: false
			} 
		};
	}

	return {
		props: {}
	};
};
