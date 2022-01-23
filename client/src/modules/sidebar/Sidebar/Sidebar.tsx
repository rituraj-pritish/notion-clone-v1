import _throttle from 'lodash/throttle'
import { SyntheticEvent, useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query'
import { ResizeCallbackData } from 'react-resizable'

import api from '@/api'
import { GetWorkspaceResult } from '@/api/endpoints/workspace'
import queryKeys from '@/constants/queryKeys'
import { CREATE_PAGE } from '@/graphql/pages'
import useSidebar from '@/hooks/useSidebar'
import { Page } from 'types/page'

import {
	NewPage,
	RootWrapper,
	Handle,
	Content,
	Trigger
} from './SideBar.styles'
import SidebarHeader from './SidebarHeader'
import SidebarItem from './SidebarItem'
import SidebarPages from './SidebarPages'

const NewPageFooter = () => {
	const queryClient = useQueryClient()

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

const Sidebar = () => {
	const [isHovering, setIsHovering] = useState<boolean>(false)
	const { isCollapsed, setWidth, width } = useSidebar()

	useEffect(() => {
		if (isCollapsed) setIsHovering(true)
	}, [isCollapsed])

	const fun = (_: SyntheticEvent, { size }: ResizeCallbackData) => {
		setWidth(size.width)
	}

	return (
		<RootWrapper
			axis='x'
			width={isCollapsed ? 0 : width}
			height={100}
			handle={<Handle />}
			minConstraints={[200, 0]}
			maxConstraints={[400, 0]}
			onResize={_throttle(fun, 300)}
		>
			<>
				<Content
					isCollapsed={isCollapsed}
					isHovering={isHovering}
					width={width}
					onMouseLeave={() => isCollapsed && setIsHovering(false)}
				>
					<SidebarHeader />
					<SidebarPages />
					<div style={{ flexGrow: 1 }} />
					<NewPageFooter />
				</Content>
				{!isHovering && <Trigger onMouseEnter={() => setIsHovering(true)} />}
			</>
		</RootWrapper>
	)
}

export default Sidebar
