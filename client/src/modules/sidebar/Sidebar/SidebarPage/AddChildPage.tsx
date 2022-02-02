import { AiOutlinePlus } from 'react-icons/ai'
import { useMutation } from 'react-query'

import { createPage, getPages } from '@/api/endpoints'
import { IconButton } from '@/atoms'
import queryClient from '@/core/queryClient'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import { Page } from 'types/page'

interface Props extends Page {
	expandChildren: VoidFunction
}

const AddChildPage = ({ id, hierarchy, expandChildren }: Props) => {
	const { mutateAsync } = useMutation(
		() =>
			createPage({
				properties: {
					title: 'Untitled'
				},
				hierarchy: {
					root: hierarchy.root ? hierarchy.root : id,
					parent: id,
					children: []
				}
			}),
		{
			onSuccess: (page) => {
				onPageUpdate(id, hierarchy, {
					hierarchy: { ...hierarchy, children: [page.id] }
				})
				queryClient.setQueryData<Page[] | undefined>(
					[id, 'children'],
					(prevData) => {
						if (!prevData) {
							let returnData: Page[] = []
							queryClient
								.fetchQuery<Page[]>([id, 'children'], () => getPages(page.id))
								.then((res) => {
									returnData = res
									expandChildren()
								})
							return [...returnData, page]
						}
						return [...prevData, page]
					}
				)
			}
		}
	)

	return (
		<IconButton
			size='small'
			tooltip='Quickly add a page inside'
			onClick={() => mutateAsync()}
			bordered
		>
			<AiOutlinePlus />
		</IconButton>
	)
}

export default AddChildPage
