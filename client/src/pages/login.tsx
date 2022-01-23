import { GetServerSidePropsContext } from 'next'

import { Center } from '@/atoms'
import LoginForm from '@/modules/login/LoginForm'

const Login = () => {
	return (
		<Center minHeight='100vh'>
			<LoginForm />
		</Center>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const token = ctx.req.cookies.auth_token

	if (token) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}

export default Login
