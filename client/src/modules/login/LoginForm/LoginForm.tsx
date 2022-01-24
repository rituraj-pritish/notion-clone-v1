import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'

import api from '@/api/index'
import { Button, Center, Input, Space, Text } from '@/atoms'
import { SIGN_IN } from '@/graphql/users'
import { SignInInput, SignInResponse } from '@/types/users'

import { RootWrapper } from './LoginForm.styles'

const LoginForm = () => {
	const [email, setEmail] = useState('ab@gmail.com')
	const [password, setPassword] = useState('123456')
	const [error, setError] = useState('')
	const router = useRouter()

	const { mutateAsync } = useMutation(
		() => api<SignInResponse, SignInInput>(SIGN_IN, { email, password }),
		{
			onMutate: () => {
				setError('')
			},
			onSuccess: () => {
				router.replace('/')
			},
			onError: (errorMsg: string) => {
				setError(errorMsg)
			}
		}
	)

	return (
		<RootWrapper>
			<Space direction='vertical' size={16}>
				<Input
					type='primary'
					size='medium'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{ width: '100%' }}
					placeholder='Enter email'
				/>
				<Input
					type='primary'
					size='medium'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{ width: '100%' }}
					placeholder='Enter password'
					inputType='password'
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
			{error && (
				<Center>
					<Text color='red'>{error}</Text>
				</Center>
			)}
		</RootWrapper>
	)
}
export default LoginForm
