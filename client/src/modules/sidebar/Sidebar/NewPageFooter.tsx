import { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query'

import { createPage } from '@/api/endpoints'
import { GetWorkspaceResult } from '@/api/endpoints/workspace'
import queryKeys from '@/constants/queryKeys'
import usePageGroups from '@/hooks/usePageGroups'
import useWorkspace from '@/hooks/useWorkspace'
import PageModal from '@/modules/page/PageModal'

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

	return (
		<>
			<PageModal isVisible={isModalVisible} page={data} />
			<SidebarItem>
				<NewPage onClick={() => mutateAsync()}>
					<BsPlus />
					New page
				</NewPage>
			</SidebarItem>
		</>
	)
}

export default NewPageFooter
