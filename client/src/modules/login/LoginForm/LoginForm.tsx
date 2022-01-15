import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { Button, Input, Space } from '@/atoms';
import { RootWrapper } from './LoginForm.styles';
import api from '@/api/index';
import { SIGN_IN } from '@/graphql/users';
import { SignInInput, SignInResponse } from '@/types/users';

const LoginForm = () => {
	const [email, setEmail] = useState('ab@gmail.com');
	const [password, setPassword] = useState('123456');
	const router = useRouter();

	const {
		mutateAsync
	} = useMutation(
		() => api<SignInResponse, SignInInput>(SIGN_IN, { email, password }),
		{
			onSuccess: () => {
				router.replace('/');
			}
		}
	);
	
	return (
		<RootWrapper>
			<Space direction='vertical' size={16}>
				<Input
					value={email}
					onChange={e => setEmail(e.target.value)}
					style={{ width: '100%' }}
					placeholder='Enter email'
				/>
				<Input
					value={password}
					onChange={e => setPassword(e.target.value)}
					style={{ width: '100%' }}
					placeholder='Enter password'
					type='password'
				/>
				<Button
					variant='primary'
					style={{ width: '100%' }}
					size='medium'
					onClick={() => mutateAsync()}
				>
					Log in
				</Button>
			</Space>
		</RootWrapper>
	);
};
export default LoginForm;
