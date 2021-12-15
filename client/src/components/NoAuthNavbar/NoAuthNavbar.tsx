import Link from 'next/link';
import Image from 'next/image';

import logo from 'assets/logo.svg';
import { RootWrapper } from './NoAuthNavbar.styles';
import { Button, Space } from 'atoms';

const NoAuthNavbar = () => {
	return (
		<RootWrapper>
			<Link href='/'>
				<Image src={logo} alt='Notion Logo'/>
			</Link>
			<Space>
				<Button size='small' ghost>Log in</Button>
				<Button variant='primary' size='medium' bold>Try Notion fee</Button>
			</Space>
		</RootWrapper>
	);
};

export default NoAuthNavbar;
