import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiChevronsRight } from 'react-icons/fi'

import { IconButton } from '@/atoms'
import useSidebarCollapsed from '@/hooks/useSidebar'

const SidebarCollapseButton = () => {
	const { isCollapsed, toggleCollapsed } = useSidebarCollapsed()
	const [isHovering, setIsHovering] = useState<boolean>(false)

	if (!isCollapsed) return null

	return (
		<div
			style={{ width: 'fit-content', padding: '0 8px' }}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<IconButton onClick={toggleCollapsed}>
				{isHovering ? <FiChevronsRight /> : <AiOutlineMenu />}
			</IconButton>
		</div>
	)
}

export default SidebarCollapseButton
