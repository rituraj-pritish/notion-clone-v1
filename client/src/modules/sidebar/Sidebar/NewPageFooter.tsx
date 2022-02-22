import { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query'

import { createPage } from '@/api/endpoints'
import { GetWorkspaceResult } from '@/api/endpoints/workspace'
import { Box, Modal } from '@/atoms'
import queryKeys from '@/constants/queryKeys'
import usePageGroups from '@/hooks/usePageGroups'
import useWorkspace from '@/hooks/useWorkspace'
import Page from '@/modules/page/Page'

import { NewPage } from './SideBar.styles'
import SidebarItem from './SidebarItem'

const NewPageFooter = () => {
	const queryClient = useQueryClient()
	const { workspace } = useWorkspace()
	const { expandGroup } = usePageGroups()

	const [isModalVisible, setIsModalVisible] = useState(false)

	const { mutateAsync, data } = useMutation(
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
				setIsModalVisible(true)
			}
		}
	)

	const newPage = queryClient
		.getQueryData(queryKeys.ROOT_PAGES)
		?.private?.find((page) => page.id === data?.id)

	return (
		<SidebarItem>
			<Modal
				visible={isModalVisible}
				styles={{ width: '970px', left: '50%', transform: 'translateX(-50%)' }}
			>
				<Modal.ModalContent>
					<Box p={2}>
						<Page {...newPage!} />
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
