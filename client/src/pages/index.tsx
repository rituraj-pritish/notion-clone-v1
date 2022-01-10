import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import { NoAuthNavbar } from 'components';
import api from 'api';
import { GET_WORKSPACE } from 'graphql/workspaces';

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
		const data = await api(GET_WORKSPACE, {}, token);
		
		return {
			redirect: {
				destination: `${data.pages[0].id}`,
				permanent: false
			} 
		};
	}

	return {
		props: {}
	};
};
