import { BsPlus } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query'

import { createPage } from '@/api/endpoints'
import { GetWorkspaceResult } from '@/api/endpoints/workspace'
import queryKeys from '@/constants/queryKeys'
import usePageGroups from '@/hooks/usePageGroups'
import useWorkspace from '@/hooks/useWorkspace'
import NewPageComponent from '@/modules/page/NewPage'
import { NewPage } from './SideBar.styles'
import SidebarItem from './SidebarItem'
import { Box, Modal } from '@/atoms'

const NewPageFooter = () => {
	const queryClient = useQueryClient()
	const { workspace } = useWorkspace()
	const { expandGroup } = usePageGroups()

	const { mutateAsync } = useMutation(
		() =>
			createPage({
				parent: {
					type: 'WORKSPACE',
					id: workspace
				},
				properties: {
					title: 'Untitled'
				},
				hierarchy: {
					root: null,
					parent: null,
					children: []
				}
			}),
		{
			onSuccess: (newPage) => {
				queryClient.setQueryData<GetWorkspaceResult>(
					queryKeys.ROOT_PAGES,
					(prevData) => ({
						...prevData,
						private: prevData!.private.concat(newPage)
					})
				)
				expandGroup('private')
			}
		}
	)

	return (
		<SidebarItem>
			<Modal
				visible
				styles={{ width: '970px', left: '50%', transform: 'translateX(-50%)' }}
			>
				<Modal.ModalContent>
					<Box p={2}>
						<NewPageComponent />
					</Box>
				</Modal.ModalContent>
			</Modal>
			<NewPage onClick={() => mutateAsync()}>
				<BsPlus />
				New page
			</NewPage>
		</SidebarItem>
	)
}

export default NewPageFooter
