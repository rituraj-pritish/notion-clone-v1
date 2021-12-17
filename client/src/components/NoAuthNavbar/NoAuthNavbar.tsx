import Image from 'next/image';
import { useRouter } from 'next/router';

import logo from 'assets/logo.svg';
import { RootWrapper } from './NoAuthNavbar.styles';
import { Button, Link, Space } from 'atoms';

const NoAuthNavbar = () => {
	const router = useRouter();
	return (
		<RootWrapper>
			<Link href='/'>
				<Image src={logo} alt='Notion Logo'/>
			</Link>
			<Space>
				<Button
					size='small'
					ghost
					bold
					onClick={() => router.push('/login')}
				>
					Log in
				</Button>
				<Button
					variant='primary'
					size='medium'
					bold
				>Try Notion fee
				</Button>
			</Space>
		</RootWrapper>
	);
};

export default NoAuthNavbar;
