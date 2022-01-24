import { BsPlus } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query'

import api from '@/api'
import { GetWorkspaceResult } from '@/api/endpoints/workspace'
import queryKeys from '@/constants/queryKeys'
import { CREATE_PAGE } from '@/graphql/pages'
import usePageGroups from '@/hooks/usePageGroups'
import { Page } from 'types/page'

import { NewPage } from './SideBar.styles'
import SidebarItem from './SidebarItem'

const NewPageFooter = () => {
	const queryClient = useQueryClient()
	const { expandGroup } = usePageGroups()

	const { mutateAsync } = useMutation(
		() =>
			api<Page>(CREATE_PAGE, {
				createPageInput: {
					name: 'Untitled',
					hierarchy: {
						root: null,
						parent: null,
						children: []
					}
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
			<NewPage onClick={() => mutateAsync()}>
				<BsPlus />
				New page
			</NewPage>
		</SidebarItem>
	)
}

export default NewPageFooter
