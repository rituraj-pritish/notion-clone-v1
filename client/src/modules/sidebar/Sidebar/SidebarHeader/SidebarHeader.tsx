import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { Button, Popover } from  '@/atoms';
import SidebarHeaderTrigger from './SidebarHeaderTrigger';
import api from  '@/api';
import { LOGOUT } from  '@/graphql/users';

const SidebarHeader = () => {
	const router = useRouter();
	const { mutateAsync } = useMutation(() => api(LOGOUT));

	return (
		<Popover
			trigger={
				<div>
					<SidebarHeaderTrigger/>
				</div>
			}
		>
			<Button
				size='medium'
				variant='secondary'
				onClick={() => mutateAsync()
					.then(() => router.replace('/login'))}
			>
					Logout
			</Button>
		</Popover>
	);
};

export default SidebarHeader;
