import LoginForm from '@/modules/login/LoginForm';
import { Center } from '@/atoms';
import { GetServerSidePropsContext } from 'next';

const Login = () => {
	return (
		<Center minHeight='100vh'>
			<LoginForm />
		</Center>
	);
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const token = ctx.req.cookies.auth_token;

	if (token) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}

export default Login;
