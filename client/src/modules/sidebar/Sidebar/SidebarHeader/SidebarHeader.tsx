import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import api from '@/api'
import { Button, Popover } from '@/atoms'
import { LOGOUT } from '@/graphql/users'

import SidebarHeaderTrigger from './SidebarHeaderTrigger'

const SidebarHeader = () => {
	const router = useRouter()
	const { mutateAsync } = useMutation(() => api(LOGOUT))

	return (
		<Popover
			trigger={
				<div>
					<SidebarHeaderTrigger />
				</div>
			}
		>
			<Button
				size='medium'
				variant='secondary'
				onClick={() => mutateAsync().then(() => router.replace('/login'))}
			>
				Logout
			</Button>
		</Popover>
	)
}

export default SidebarHeader
