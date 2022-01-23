import Image from 'next/image'
import { useRouter } from 'next/router'

// eslint-disable-next-line
// @ts-ignore svg compile issue
import Logo from '@/assets/logo.svg'
import { Button, Link, Space } from '@/atoms'

import { RootWrapper } from './NoAuthNavbar.styles'

const NoAuthNavbar = () => {
	const router = useRouter()
	return (
		<RootWrapper>
			<Link href='/'>
				<Image src={Logo} alt='Notion Logo' />
			</Link>
			<Space>
				<Button
					size='small'
					variant='secondary'
					ghost
					bold
					onClick={() => router.push('/login')}
				>
					Log in
				</Button>
				<Button variant='primary' size='medium' bold>
					Try Notion fee
				</Button>
			</Space>
		</RootWrapper>
	)
}

export default NoAuthNavbar
