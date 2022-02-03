import { useRouter } from 'next/router'
import { AiOutlinePlus } from 'react-icons/ai'
import { useMutation } from 'react-query'

import { createPage } from '@/api/endpoints'
import { GetWorkspaceResult } from '@/api/endpoints/workspace'
import { IconButton, Tooltip } from '@/atoms'
import queryKeys from '@/constants/queryKeys'
import queryClient from '@/core/queryClient'
import usePageGroups from '@/hooks/usePageGroups'
import useWorkspace from '@/hooks/useWorkspace'

const { SubText } = Tooltip

const AddGroupPage = () => {
	const { expandGroup } = usePageGroups()
	const { workspace } = useWorkspace()
	const router = useRouter()

	const { mutateAsync } = useMutation(
		() =>
			createPage({
				properties: {
					title: 'Untitled'
				},
				parent: {
					type: 'WORKSPACE',
					id: workspace
				},
				hierarchy: {
					root: null,
					parent: null,
					children: []
				}
			}),
		{
			onSuccess: (page) => {
				queryClient.setQueryData<GetWorkspaceResult>(
					queryKeys.ROOT_PAGES,
					(prevData) => ({
						...prevData!,
						private: [page, ...prevData!.private]
					})
				)
				router.push(`/${page.id}`)
				expandGroup('private')
			}
		}
	)

	return (
		<Tooltip
			overlay={
				<>
					<div>Add a page</div>
					<SubText>Only you can access these pages.</SubText>
				</>
			}
			placement='top-start'
		>
			<IconButton size='small' bordered onClick={() => mutateAsync()}>
				<AiOutlinePlus />
			</IconButton>
		</Tooltip>
	)
}

export default AddGroupPage
