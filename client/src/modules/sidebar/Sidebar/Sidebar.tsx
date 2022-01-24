import _throttle from 'lodash/throttle'
import { SyntheticEvent, useEffect, useState } from 'react'
import { ResizeCallbackData } from 'react-resizable'

import useSidebar from '@/hooks/useSidebar'

import NewPageFooter from './NewPageFooter'
import { RootWrapper, Handle, Content, Trigger } from './SideBar.styles'
import SidebarHeader from './SidebarHeader'
import SidebarPages from './SidebarPages'

const Sidebar = () => {
	const [isHovering, setIsHovering] = useState<boolean>(false)
	const {
		isCollapsed,
		setWidth,
		width,
		setIsHovering: setIsHoveringSidebar
	} = useSidebar()

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
					onMouseEnter={() => setIsHoveringSidebar(true)}
					onMouseLeave={() => {
						isCollapsed && setIsHovering(false)
						setIsHoveringSidebar(false)
					}}
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
