import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import api from '@/api'
import { Button, Popover } from '@/atoms'
import { LOGOUT } from '@/graphql/users'

import SidebarHeaderTrigger from './SidebarHeaderTrigger'

const { Trigger, Content } = Popover

const SidebarHeader = () => {
	const router = useRouter()
	const { mutateAsync } = useMutation(() => api(LOGOUT))

	return (
		<Popover placement='bottom'>
			<Trigger>
				<div style={{ marginBottom: '8rem' }}>
					<SidebarHeaderTrigger />
				</div>
			</Trigger>
			<Content>
				<Button
					size='small'
					variant='secondary'
					onClick={() => mutateAsync().then(() => router.replace('/login'))}
				>
					Logout
				</Button>
			</Content>
		</Popover>
	)
}

export default SidebarHeader
