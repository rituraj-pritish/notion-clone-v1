import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import api from '@/api'
import { Box, Button, Popover, Text } from '@/atoms'
import { LOGOUT } from '@/graphql/users'
import useWorkspace from '@/hooks/useWorkspace'

import SidebarHeaderTrigger from './SidebarHeaderTrigger'

const { Trigger, Content } = Popover

const SidebarHeader = () => {
	const router = useRouter()
	const { user } = useWorkspace()
	const { mutateAsync } = useMutation(() => api(LOGOUT))

	return (
		<Popover placement='bottom'>
			<Trigger>
				<div style={{ marginBottom: '8rem' }}>
					<SidebarHeaderTrigger />
				</div>
			</Trigger>
			<Content>
				<Box p={2} style={{ borderRadius: '4px' }}>
					<Text pb={2}>{user?.email}</Text>
					<Button
						size='small'
						variant='secondary'
						onClick={() => mutateAsync().then(() => router.replace('/login'))}
						style={{ width: '100%' }}
					>
						Logout
					</Button>
				</Box>
			</Content>
		</Popover>
	)
}

export default SidebarHeader
