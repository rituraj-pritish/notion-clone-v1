import { Flex, Tooltip } from '@/atoms'
import usePageGroups from '@/hooks/usePageGroups'
import useSidebar from '@/hooks/useSidebar'
import { Page } from 'types/page'

import SidebarPage from '../Sidebar/SidebarPage'
import AddGroupPage from './AddGroupPage'
import { GroupName } from './SidebarPageGroup.styles'

export type GroupName = 'PRIVATE' | 'FAVORITES' | 'SHARED'

interface Props {
	name: GroupName
	pages: Page[]
}

const { SubText } = Tooltip

const SidebarPageGroup = ({ name, pages = [] }: Props) => {
	const { isHovering } = useSidebar()
	const { isCollapsed, toggleCollapsed } = usePageGroups(name)

	if (pages.length === 0) return null

	const displaySubtext = () => {
		if (name === 'PRIVATE') return 'Only you can access these pages.'
		if (name === 'FAVORITES') return 'Pages you have favorited.'
	}

	return (
		<Flex
			flexDirection='column'
			mb={isCollapsed ? 2 : 4}
			data-testid={`page-group-${name}`}
		>
			<Flex justifyContent='space-between' pr={12}>
				<Tooltip
					overlay={
						<>
							<div>Click to {isCollapsed ? 'show' : 'hide'} section</div>
							<SubText>{displaySubtext()}</SubText>
						</>
					}
					placement='top-start'
				>
					<GroupName onClick={() => toggleCollapsed()}>{name}</GroupName>
				</Tooltip>
				{isHovering && name === 'PRIVATE' && <AddGroupPage />}
			</Flex>
			<div style={{ display: isCollapsed ? 'none' : 'block' }}>
				{pages.map((page) => (
					<SidebarPage
						key={page.id}
						{...page}
						isInsideFavoritesGroup={name === 'FAVORITES'}
					/>
				))}
			</div>
		</Flex>
	)
}

export default SidebarPageGroup
