import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage
} from 'next'

import { getWorkspace } from '@/api/endpoints/workspace'
import { NoAuthNavbar } from '@/components'

const Home: NextPage = () => {
	return (
		<div>
			<NoAuthNavbar />
		</div>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	const token = ctx.req.cookies.auth_token

	if (token) {
		const data = await getWorkspace(token)
		
		return {
			redirect: {
				destination: `/${data.private[0].id}`,
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}
