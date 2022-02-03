import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsTriangleFill } from 'react-icons/bs'
import { useQuery } from 'react-query'

import api from '@/api'
import { Flex, IconButton, Space, Text } from '@/atoms'
import { GET_PAGES } from '@/graphql/pages/queries'
import useSidebar from '@/hooks/useSidebar'
import ChangeIcon from '@/shared/ChangeIcon'
import { Page } from '@/types/page'

import SidebarItem from '../SidebarItem'
import AddChildPage from './AddChildPage'
import { Left, PageName } from './SidebarPage.styles'
import SidebarPageMoreOptions from './SidebarPageMoreOptions'

interface Props extends Page {
	depth?: number
	isInsideFavoritesGroup: boolean
}

const OPTIONS_WIDTH = 117
const PADDING_AND_TOGGLE_ICON_WIDTH = 26

const SidebarPage = ({ depth = 0, isInsideFavoritesGroup, ...page }: Props) => {
	const {
		id,
		icon,
		properties: { title },
		hierarchy
	}: Page = page

	const { refetch, data } = useQuery<Page[]>(
		[id, 'children'],
		() => api(GET_PAGES, { ids: hierarchy.children.join(',') }),
		{ enabled: false }
	)

	useEffect(() => {
		setChildren(data!)
	}, [data])

	const router = useRouter()
	const { width } = useSidebar()
	const { pageId } = router.query

	const [children, setChildren] = useState<Page[] | null>(null)
	const [isHovering, setIsHovering] = useState<boolean>(false)
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

	const toggleCollapsed = () => setIsCollapsed((state) => !state)

	useEffect(() => {
		if (!isCollapsed && !children) {
			if (hierarchy.children.length === 0) {
				setChildren([])
				return
			}
			refetch().then((res) => {
				if (res.data) setChildren(res.data)
			})
		}
		// eslint-disable-next-line
	}, [isCollapsed])

	const isActive = id === pageId
	const showNestedElements = children && !isCollapsed && Array.isArray(children)

	return (
		<>
			<SidebarItem
				isActive={isActive}
				onClick={() => router.push(`/${id}`)}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				data-testid={`sidebar-page-${title}`}
			>
				<Flex
					justifyContent='space-between'
					px={12}
					py={1}
					pl={depth ? depth * 26 + 12 : 12}
				>
					<Left>
						<Space size={4}>
							<IconButton
								size='small'
								style={{ width: '20px', height: '20px' }}
								onClick={toggleCollapsed}
							>
								<BsTriangleFill
									style={{
										transform: `rotate(${isCollapsed ? 90 : 180}deg)`,
										transition: 'transform 0.15s'
									}}
									size={8}
								/>
							</IconButton>
							<ChangeIcon
								icon={icon}
								{...page}
								haveChildren={hierarchy.children?.length > 0}
							/>
							<PageName
								style={{
									width: isHovering
										? `${
												width -
												(depth
													? depth * PADDING_AND_TOGGLE_ICON_WIDTH +
													  OPTIONS_WIDTH
													: OPTIONS_WIDTH)
										  }px`
										: undefined,
									color: isActive ? 'black' : undefined
								}}
							>
								{title}
							</PageName>
						</Space>
					</Left>
					{isHovering && (
						<Space size={4}>
							<SidebarPageMoreOptions
								isInsideFavoritesGroup={isInsideFavoritesGroup}
								{...page}
							/>
							<AddChildPage
								expandChildren={() => setIsCollapsed(false)}
								{...page}
							/>
						</Space>
					)}
				</Flex>
			</SidebarItem>
			{showNestedElements && (
				<div>
					{children.length === 0 ? (
						<Text
							size='medium'
							pl={depth ? depth * PADDING_AND_TOGGLE_ICON_WIDTH + 40 : 40}
						>
							No pages inside
						</Text>
					) : (
						children.map((page) => (
							<SidebarPage
								isInsideFavoritesGroup={isInsideFavoritesGroup}
								key={page.id}
								depth={depth + 1}
								{...page}
							/>
						))
					)}
				</div>
			)}
		</>
	)
}

export default SidebarPage
